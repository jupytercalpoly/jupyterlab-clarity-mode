module.exports = {
  entry: ['./clarity/static/index.js'],
  output: {
    path:require('path').join(__dirname, 'clarity','static'),
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.html$/, use: 'file-loader' },
      { test: /\.md$/, use: 'raw-loader' },
      { test: /\.js.map$/, use: 'file-loader' },
      {
        test: /\.svg/,
        use: [
          { loader: 'svg-url-loader', options: {} },
          { loader: 'svgo-loader', options: { plugins: [] } }
        ]
      },
      {
        test: /\.(png|jpg|gif|ttf|woff|woff2|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{ loader: 'url-loader', options: { limit: 10000 } }]
      }
    ]
  }
}