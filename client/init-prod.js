const { initPrefetching } = require('../lib/link-prefetch')
const logger = console

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(registration => {
      // If the service worker is active, we can start prefetching immediately.
      if (registration.active) {
        logger.info('service worker activated')
        initPrefetching()
        return
      }

      // Otherwise, we need to wait until the service worker is activated.
      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing
        installingWorker.onstatechange = e => {
          if (e.target.state === 'activated') {
            installingWorker.onstatechange = null
            logger.info('service worker registered and activated')
            initPrefetching()
          }
        }
      })
    })
    .catch(err =>
      logger.warn('service worker registration failed', err.message)
    )
}
