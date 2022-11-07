const path = require('path');

const express = require('express');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./src/services/db.json');
const middlewares = jsonServer.defaults({
  static: './build',
});
const app = express();
const PORT = process.env.PORT || 8000;
server.use(middlewares);
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  }),
);
server.use(router);
server.listen(PORT, () => {
  console.log('Server is running');
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
  });
}
