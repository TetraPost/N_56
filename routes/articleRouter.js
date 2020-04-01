const express = require('express');

const articleRouter = express.Router();

articleRouter.get('/', (req, res, next) => {
  res.render('articleList', { title: 'Articles List'});
});

module.exports = articleRouter;
