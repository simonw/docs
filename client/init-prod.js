const { initPrefetching } = require('../lib/link-prefetch')
const logger = console

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(() => {
      logger.info('service worker registration successful')
      initPrefetching()
    })
    .catch(err =>
      logger.warn('service worker registration failed', err.message)
    )
}
