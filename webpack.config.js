module.exports={
  mode: 'development',
  entry:__dirname+"/public/index.js",
  output:{
    path:__dirname+"/public",
    filename:'bundle.js'
  },
  devServer:{
    contentBase:"./public"
  },
  module:{
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader'},
      {
        test: /\.css$/,
        use: [{
            loader: 'style-loader'
        }, {
            loader: 'css-loader'
        }],
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
          options: {
            sourceMap: true,
          },
        }],
      },
    ]
  }
}