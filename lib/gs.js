export const pageview = (url, title) => {
  window._gs('track', url, title)
}

export const event = (name, data) => {
  window._gs('event', name, data)
}
