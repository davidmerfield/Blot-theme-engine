module.exports = function (token, req, res, next) {

  res.locals.name = 'David';

  next();
}