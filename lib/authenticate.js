// Helpers
import fetchAPI from './fetch-api'
import { API_USER } from './api-endpoints'

const isServer = typeof window === 'undefined'

export default (async function authenticate({ req }) {
  const token = getToken({ req })
  if (!token) return {}

  if (!isServer) {
    // Sometimes, user in the client side global cache can be undefined.
    // So, we need to get the user again and assign the user to the global cache.
    if (!window.__user) {
      const { user } = await getUser(token)
      window.__user = user
    }

    return { user: window.__user, token }
  }

  const user = await getUser(token)
  return { ...user, token }
})

export function getToken({ req } = {}) {
  if (req) {
    const parseCookie = require('cookie').parse
    const { cookie } = req.headers
    if (!cookie) return

    const { token } = parseCookie(cookie)
    return token
  } else {
    const Cookies = require('js-cookie')
    const { token } = Cookies.get()
    return token
  }
}

export async function getUser(token) {
  let res

  try {
    res = await fetchAPI(API_USER, token, {
      throwOnHTTPError: true
    })
  } catch (err) {
    if (err.status && 403 === err.status) {
      return {}
    }
    throw err
  }

  return res
}
