const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images')

module.exports = withTypescript(
  withImages(
    withCSS()
  )
)
