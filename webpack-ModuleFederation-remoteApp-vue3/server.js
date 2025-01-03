const express = require('express');
const path = require('path');
const app = express();

// 手动设置 CORS 请求头
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // 允许的源
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // 允许的请求方法
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  next();
});

// app.use((req, res, next) => {
//   const fileType = path.extname(req.url).toLowerCase();
//   // res.set('Cache-Control', 'public, max-age=31536000, immutable'); // 缓存 1 年
//   // 为 CSS、JS 和图片文件设置不同的缓存策略
//   if (fileType === '.css' || fileType === '.js') {
//     res.set('Cache-Control', 'public, max-age=31536000, immutable'); // 缓存 1 年
//   } else if (fileType === '.jpg' || fileType === '.png') {
//     res.set('Cache-Control', 'public, max-age=2592000'); // 缓存 30 天
//   }
//   next();
// });

// 将打包后的目录作为静态资源目录
app.use(express.static(path.join(__dirname, 'dist')));

// 对于所有的路由请求，都返回index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = 3002;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
