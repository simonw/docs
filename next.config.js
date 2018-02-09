const glob = require('glob-promise')
const SwPrecachePlugin = require('sw-precache-webpack-plugin')

module.exports = {
  exportPathMap: async function() {
    const paths = await glob('pages/**')
    const pages = paths
      .map(path => {
        path = path.replace(/^pages/, '')
        path = path.replace('index.js', '')
        path = path.replace('.js', '')

        if (path === '/_document') return
        if (path === '/') return path

        path = path.replace(/\/$/, '')
        return path
      })
      .filter(Boolean)

    const pageMap = pages.reduce((map, page) => {
      map[page] = { page }
      return map
    }, {})

    return pageMap
  },

  webpack: function(config, { dev, isServer }) {
    if (isServer) {
      return config
    }

    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()
      const initFilePath = `./client/init-${dev ? 'dev' : 'prod'}.js`
      entries['main.js'].unshift(initFilePath)
      return entries
    }

    if (dev) {
      return config
    }

    config.plugins.push(
      new SwPrecachePlugin({
        verbose: false,
        minify: true,
        // Do not precache anything.
        // This allows us to handle caching at runtime.
        staticFileGlobsIgnorePatterns: [/.*/],
        runtimeCaching: [
          // Cache all the Next.js assets. Once cached, they don't need to get refetched
          {
            handler: 'cacheFirst',
            urlPattern: /^https?:\/\/.*\/_next/
          },
          // Cache any page for /docs or /api. But make sure to fetch it from the network first
          {
            handler: 'networkFirst',
            urlPattern: /^https?:\/\/.*\/(docs|api)/
          },
          // Cache anything in the static directory. We don't updates items in the static directory.
          // So, it's fine to use the cacheFirst handler
          {
            handler: 'cacheFirst',
            urlPattern: /^https?:\/\/.*\/static/
          }
        ]
      })
    )

    return config
  },

  // By default we don't have any assetPrefix.
  // This is because we need to support PR based static deployments
  // But for multi-zones suppport we are running a custom proxy which adds
  // multi-zones support.
  assetPrefix: ''
}
