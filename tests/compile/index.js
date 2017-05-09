var rimraf = require('rimraf');
var tmp = __dirname + '/tmp';

rimraf.sync(tmp);
var assert = require('assert');
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

        var result = {templates: templates, routes: routes};
        var compare = test.compare.split(' > ');

        try {
          compare.forEach(function(selector){result = result[selector];});
          assert.deepEqual(test.expected, result);
        } catch (e) {
          console.log('✖ ', test.label, 'test failed and returned incorrect result:');
          console.log(JSON.stringify({templates: templates, routes: routes}, null, 2));
          console.log('The result has unexpected values for', test.compare);
          console.log(JSON.stringify(test.expected,null,2));
          console.log();
          return next(); // throw e;
        }

        console.log('✔ ', test.label, 'test passed!');


        next();
      });
    });
  }, function(){

    rimraf.sync(tmp);
    cb();
  });
};
