module.exports = {
  entry: ['./clarity/static/index.js'],
  output: {
    path:require('path').join(__dirname, 'clarity','static'),
    filename: 'bundle.js'
  },
  mode: 'development'
}