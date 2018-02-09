const logger = console

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => {
      logger.log(`unregistering service worker for ${registration.scope}`)
      registration.unregister()
    })
  })
}
