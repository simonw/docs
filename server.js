const micro = require('micro')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const dir = __dirname
const port = process.env.PORT || 5800

const logger = console
const app = next({ dev, dir })
const handleNextRequests = app.getRequestHandler()

app.prepare().then(() => {
  const server = micro((req, res) => {
    // Add assetPrefix support based on the hostname
    if (req.headers.host === 'docs.now.sh') {
      // TODO: Set a proper cloudinary custom origin URL
      app.setAssetPrefix('')
    } else {
      // This is to support multi-zones support in localhost
      // and may be in staging deployments
      app.setAssetPrefix(`http://${req.headers.host}`)
    }

    handleNextRequests(req, res)
  })

  server.listen(port, err => {
    if (err) {
      throw err
    }

    logger.log(`> Ready on http://localhost:${port}`)
  })
})
