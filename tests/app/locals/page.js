module.exports = function (token, req, res, callback) {

  var current = parseInt(res.params.page) || 1;
  var total = 10;

  res.locals.page = {
    posts: [{title: 'a' + current}, {title: 'b' + current}],
    next: current < total ? current + 1 : false,
    previous: current > 1 ? current - 1 : false,
    current: current,
    total: total
  };

  callback();
}