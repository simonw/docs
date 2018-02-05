// Packages
import fetch from 'isomorphic-unfetch'
import retry from 'async-retry'
import { parse as parseContentType } from 'content-type'

// Helpers
import env from './env'

const API_URL = env.API_URL || 'https://zeit.co'
const NETWORK_ERR_CODE = 'network_error'
const NETWORK_ERR_MESSAGE = 'A network error has occurred. Please retry'

const isServer = typeof window === 'undefined'
const agents = new Map()

export default async function fetchAPI(path, token = null, opts = {}) {
  const headers = opts.headers || {}

  if (token) {
    headers.Authorization = `bearer ${token}`
  }

  // accept path to be a full url or a relative path
  const url = path[0] === '/' ? API_URL + path : path
  let agent

  if (isServer) {
    const { parse } = require('url')
    const { protocol } = parse(url)
    if (protocol) {
      agent = getAgent(protocol)
    }
  }

  return retry(
    async bail => {
      let res, data, err

      try {
        res = await fetch(url, { ...opts, headers, agent })
        if (opts.throwOnHTTPError && (res.status < 200 || res.status >= 300)) {
          const { type } = parseContentType(res.headers.get('Content-Type'))
          if (type === 'application/json') {
            data = await res.json()
            err = new Error(
              data.error == null ? 'Unexpected Error' : data.error.message
            )
            err.res = res
            err.status = res.status
            // TODO: remove this hack https://github.com/zeit/front/issues/553
            err.code = data.error == null ? res.status : data.error.code
          } else {
            // handle it below as network error
            throw new Error('Unexpected response content-type: ' + type)
          }
        } else {
          data = await res.json()
        }
      } catch (e) {
        err = isServer ? e : new Error(NETWORK_ERR_MESSAGE + ` (${url})`)
        err.code = NETWORK_ERR_CODE
        err.res = null
        err.status = null
      }

      if (!err) return data
      if (err.status < 500) return bail(err)
      throw err
    },
    { retries: 3, maxTimeout: 2500 }
  )
}

const getAgent = protocol => {
  if (!agents.has(protocol)) {
    const http = require('http')
    const https = require('https')
    const module = protocol === 'https:' ? https : http
    const opts = {
      keepAlive: true,
      keepAliveMsecs: 10000,
      maxSockets: 100
    }
    const agent = new module.Agent(opts)
    agents.set(protocol, agent)
  }

  return agents.get(protocol)
}
