var fs = require('fs');
var blogDir = __dirname + '/../../../blog';
var joinpath = require('path').join;

module.exports = function (req, res, next, param) {

  var folder = false;

  try {
    folder = fs.statSync(joinpath(blogDir, value)).isDirectory();
  } catch (e) {
    return callback(e);
  }

  if (folder) return callback();

  return callback(new Error('Not a folder'));
};