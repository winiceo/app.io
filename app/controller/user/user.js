const Model = require('../../mocks/article/list');

exports.login = function* (ctx) {
  yield ctx.render('user/about/about.js', '3333');
};
