var rimraf = require('rimraf');
var tmp = __dirname + '/tmp';

rimraf.sync(tmp);

var helper = require('helper');
var forEach = helper.forEach;
var tests = require('helper').dirToModule(__dirname, require);
var fs = require('fs');
var join = require('path').join;
var Theme = require('../../index');

module.exports = function (cb) {

  forEach(tests, function(label, test, next){

    rimraf.sync(tmp);

    fs.mkdirSync(tmp);

    // Prepare folder
    forEach(test.folder, function(name, content, next){

      fs.writeFile(join(tmp,name), content, 'utf-8', next);

    }, function(){

      console.log(label, '>', test);
      Theme.compile(tmp, function(err, templates, routes){

        console.log(err);
        console.log(templates);
        console.log(routes);

        next();

      });



    });
  }, function(){

    rimraf.sync(tmp);
    cb();
  });
};
