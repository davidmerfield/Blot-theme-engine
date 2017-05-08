module.exports = function (token, req, res, callback) {

  res.locals.tag = {
    name: res.locals.tag,
    posts: [{title: 'a' + res.locals.page}, {title: 'b' + res.locals.page}]
  };

}