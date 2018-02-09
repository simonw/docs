const micro = require('micro')
const next = require('next')
const { join } = require('path')

const dev = process.env.NODE_ENV !== 'production'
const dir = __dirname
const port = process.env.PORT || 5800

const logger = console
const app = next({ dev, dir })
const handleNextRequests = app.getRequestHandler()

app.prepare().then(() => {
  const server = micro((req, res) => {
    // Add assetPrefix support based on the hostname
    if (req.headers.host === 'docs.zeit.sh') {
      // Set the cloudinary custom origin which points to https://docs.zeit.sh
      app.setAssetPrefix('https://assets.zeit.co/raw/upload/docs-assets')
    } else if (/localhost/.test(req.headers.host)) {
      // Set the assetPrefix for localhost
      // It needs to be the http version
      app.setAssetPrefix(`http://${req.headers.host}`)
    } else {
      // Set the assetPrefix for localhost
      // It needs to be the https version, since now is always HTTPS
      app.setAssetPrefix(`https://${req.headers.host}`)
    }

    if (req.url === '/service-worker.js') {
      const swFilePath = join(__dirname, '.next', req.url.replace('/', ''))
      app.serveStatic(req, res, swFilePath)
    } else {
      handleNextRequests(req, res)
    }
  })

  server.listen(port, err => {
    if (err) {
      throw err
    }

    logger.log(`> Ready on http://localhost:${port}`)
  })
})
