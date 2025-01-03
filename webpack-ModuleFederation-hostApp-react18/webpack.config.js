const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const packageJson = require('./package.json');
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    bundle: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html', // 打包后的文件名
      template: './src/index.html', // 模板文件路径
    }),
    new ModuleFederationPlugin({
      name: 'hostApp', // 模块名称
      remotes: {
        remoteAppReact19: 'remoteApp@http://localhost:3001/remoteEntry.js', // 远程模块地址
        remoteAppVue: 'remoteAppVue@http://localhost:3002/remoteEntry.js', // 远程模块地址
      },
      shared: {
        /**
         * 6. 共享模块的优先级规则
            Webpack 会按以下优先级加载共享模块：
            1.本地优先加载：
            主机和远程会优先加载自身的模块。

            2.版本匹配优先：
            如果声明了 requiredVersion，Webpack 会优先加载版本匹配的模块。

            3.单例优先：
            如果声明了 singleton: true，Webpack 会确保模块只加载一次，并在主机和远程之间共享实例。
         */
        react: {
          eager: true,
          singleton: true,
          requiredVersion: packageJson.dependencies.react,
        },
        'react-dom': {
          eager: true,
          singleton: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        },
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
