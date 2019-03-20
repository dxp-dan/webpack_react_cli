module.exports={
  mode: 'development',
  entry:__dirname+"/public/index.jsx",
  output:{
    path:__dirname+"/public",
    filename:'bundle.js'
  },
  devServer:{
    contentBase:"./public"
  },
  module:{
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader'}
    ]
  }
}