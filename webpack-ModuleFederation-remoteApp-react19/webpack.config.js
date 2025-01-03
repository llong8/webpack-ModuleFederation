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
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
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
      name: 'remoteApp', // 向外暴露的模块名称
      filename: 'remoteEntry.js', // 额外打包出的文件,专门服务于宿主应用的一个js文件
      exposes: {
        './MyComponent': './src/MyComponent', // 像宿主应用暴露的组件
      },
      shared: {
        react: {
          eager: true, // 宿主应用加载时立即记载
          singleton: true, // 确保 React 实例是单例
          requiredVersion: packageJson.dependencies.react, // 使用项目中的 React 版本
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
