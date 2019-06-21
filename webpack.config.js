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
<<<<<<< HEAD
        '/api': 'http://localhost:3000',
        // '/api/auth/google': 'https://localhost:3000/api/auth/google',
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
=======
        '/api': 'http://localhost:8000',
>>>>>>> 23d37feae9a672a4263def1f857a8f2238386db7
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
