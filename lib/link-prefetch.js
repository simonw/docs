import React from 'react'
import Link from 'next/link'
import PQueue from 'next/dist/lib/p-queue'
import fetch from 'isomorphic-unfetch'

const logger = console
const queue = new PQueue({ concurrency: 2 })
let canPrefetch = false
let onInitCallbacks = []

export default class LinkPrefetch extends React.Component {
  async prefetchHtml() {
    const { as, href } = this.props
    const path = as || href
    if (process.env.NODE_ENV === 'production') {
      try {
        await queue.add(() => prefetch(path))
      } catch (err) {
        logger.error(`Error on prefetch ${path}: ${err.message}`)
      }
    }
  }

  componentDidMount() {
    if (canPrefetch) {
      this.prefetchHtml()
      return
    }

    onInitCallbacks.push(() => this.prefetchHtml())
  }

  render() {
    // TODO: Remove prefetch prop after we did it via HTML parsing
    return <Link prefetch {...this.props} />
  }
}

export async function prefetch(path) {
  const res = await fetch(path)
  if (res.status != 200) {
    logger.warn(`Failed to fetch html for ${path}`)
    return
  }

  await res.text()
}

export function initPrefetching() {
  // prefetch the current page
  prefetch(location.href)

  // start prefetching all other pages
  canPrefetch = true
  onInitCallbacks.forEach(cb => cb())
  onInitCallbacks = null
}
