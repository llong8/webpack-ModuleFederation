const { VueLoaderPlugin } = require('vue-loader');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies
const path = require('path');
module.exports = {
  mode: 'production',
  entry: {
    bundle: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      // 处理.vue
      {
        test: /\.vue/,
        loader: 'vue-loader', // 也可以使用 use: 'vue-loader'
        options: {
          compilerOptions: {
            // 模板编译器的选项
            preserveWhitespace: false, // 放弃模板标签之间的空格
          },
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './index.html'),
      chunks: ['bundle'],
    }),
    new ModuleFederationPlugin({
      name: 'remoteAppVue', // 向外暴露的模块名称
      filename: 'remoteEntry.js', // 额外打包出的文件,专门服务于宿主应用的一个js文件
      exposes: {
        './vueApp': './src/App.vue',  // 向宿主应用暴露的组件
        './vue': 'vue', // 把vue向宿主应用暴露,shared中的vue会共享给宿主应用
      },
      shared: {
        vue: {
          // 远程应用会确保它自己的 vue 版本被共享到宿主应用中。
          eager: true, // 宿主应用加载时立即记载
          singleton: true, // 确保 vue 实例是单例
          requiredVersion: deps.vue, // 要求版本匹配
        },
      },
    }),
  ],
  resolve: {
    alias: {
      // vue: path.resolve('./node_modules/vue'), // 确保使用本地安装的 Vue
    },
    extensions: ['.vue', '.js', '.json'],
  },
};
