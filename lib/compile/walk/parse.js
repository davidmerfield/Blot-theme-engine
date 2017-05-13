var hogan = require('hogan.js');

module.exports = function (text, callback) {
  var tree;

  try {
    tree = hogan.parse(hogan.scan(text));
  } catch (e) {
    return callback(e);
  }

  return callback(null, tree);
}