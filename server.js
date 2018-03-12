const micro = require('micro')
const next = require('next')
const qs = require('querystring')
const url = require('url')

const dev = process.env.NODE_ENV !== 'production'
const dir = __dirname
const port = process.env.PORT || 5800

const logger = console
const app = next({ dev, dir })
const handleNextRequests = app.getRequestHandler()

function removeEndSlash(fn) {
  return (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const isNext = parsedUrl.path.includes('/_next/')
    if (isNext) return fn(req, res)

    if (parsedUrl.path !== '/' && parsedUrl.path.slice(-1) === '/') {
      const q = qs.stringify(parsedUrl.query)
      res.writeHead(301, {
        Location: parsedUrl.path.slice(0, -1) + (q ? '?' + q : '')
      })
      res.end()
      return
    }

    return fn(req, res, parsedUrl)
  }
}

app.prepare().then(() => {
  const server = micro(
    removeEndSlash((req, res, parsedUrl) => {
      // Add assetPrefix support based on the hostname
      if (req.headers.host === 'docs.zeit.sh') {
        // Set the cloudinary custom origin which points to https://docs.zeit.sh
        app.setAssetPrefix('https://assets.zeit.co/raw/upload/docs-assets')
      } else if (/localhost/.test(req.headers.host)) {
        // Set the assetPrefix for localhost
        // It needs to be the http version
        app.setAssetPrefix(`http://${req.headers.host}`)
      } else {
        // Set the assetPrefix for now
        // It needs to be the https version, since now is always HTTPS
        app.setAssetPrefix(`https://${req.headers.host}`)
      }

      handleNextRequests(req, res, parsedUrl)
    })
  )

  server.listen(port, err => {
    if (err) {
      throw err
    }

    logger.log(`> Ready on http://localhost:${port}`)
  })
})
