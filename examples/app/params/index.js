var helper = require('helper');
var checkers = helper.dirToModule(__dirname, require);
var forEach = helper.forEach;

module.exports = function (req, params, callback) {

  forEach(params, function(name, value, next){

    if (!checkers[name]) return next();

    checkers[name](req, value, function(err){

      if (err) return callback(err);

      next();
    });
  }, callback);
};