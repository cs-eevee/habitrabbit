const webpack = require('webpack');

module.exports = env => {
  console.log('NODE_ENV: ', env.NODE_ENV);
  return {
    mode: env.NODE_ENV,
    entry: './src/frontend/index.js',
    output: {
      path: `${__dirname}/dist`,
      publicPath: '/',
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: './dist',
      proxy: {
        '/': 'http://localhost:3000',
      },
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
      ],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  };
};
