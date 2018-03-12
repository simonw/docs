// this file exports a bunch of replacements
// that are made across the source-code

module.exports = {
  VERSION: require('./package').version,
  'process.env.NODE_ENV': process.env.NODE_ENV,
  IMAGE_ASSETS_URL: 'https://assets.zeit.co/image/upload/front',
  VIDEO_ASSETS_URL: 'https://assets.zeit.co/video/upload/front',
  RAW_ASSETS_URL: 'https://assets.zeit.co/raw/upload/front'
}
