const { createProxyMiddleware } = require('http-proxy-middleware')

const apiUrl = 'http://localhost:5000'

module.exports = app =>
  app.use(
    '/api',
    createProxyMiddleware({
      target: apiUrl,
      pathRewrite: {
        '^/api/': '',
      },
    })
  )
