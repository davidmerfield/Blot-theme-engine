var valid = ['/a', '/b', '/c'];

module.exports = function (req, value, callback) {

  if (valid.indexOf('/' + value) > -1) return callback();

  callback(new Error('Not a tag'));
};