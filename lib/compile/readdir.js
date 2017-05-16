var fs = require('fs');
var join = require('path').join;
var forEach = require('helper').forEach;

module.exports = function (root, callback) {

  walk(root, function(err, files){

    if (err) return callback(err);

    files = files.map(function(path){
      return path.slice(root.length);
    });

    return callback(null, files);
  });
};

function walk (dir, callback) {

  var results = [];

  fs.readdir(dir, function(err, list) {

    if (err) return callback(err);

    forEach(list, function(name, next){

      fs.stat(join(dir, name), function(err, stat){

        if (err) return callback(err);

        if (!stat.isDirectory()) {
          results.push(join(dir, name));
          return next();
        }

        walk(join(dir, name), function(err, res){

          if (err) return callback(err);

          results = results.concat(res);
          next();
        });
      });

    }, function(){
      callback(null, results);
    });
  });
}
