var rimraf = require('rimraf');
var tmp = __dirname + '/tmp';
var mkdirp = require('mkdirp');
var dirname = require('path').dirname;
var chalk = require('chalk');
rimraf.sync(tmp);
var assert = require('assert');
var helper = require('helper');
var forEach = helper.forEach;
var tests = require('helper').dirToModule(__dirname, require);
var fs = require('fs');
var join = require('path').join;
var Theme = require('../../lib');
var log = require('log');
var jsondiff = require('json-diff');

module.exports = function (cb) {

  forEach(tests, function(label, test, next){

    rimraf.sync(tmp);

    fs.mkdirSync(tmp);

    // Prepare folder
    forEach(test.folder, function(name, content, next){

      var path = join(tmp,name);

      mkdirp(dirname(path), function(err){

        if (err) throw err;

        fs.writeFile(path, content, 'utf-8', next);
      });

    }, function(){

      Theme.compile(tmp, function(err, theme){

        if (err) return log.error(err);

        var result = theme;
        var compare;

        if (test.compare) compare = test.compare.split(' > ');

        if (test.compare && compare.length > 1) {

          try {
            compare.forEach(function(selector){
              result = result[selector];
            });
          } catch (e) {
            log.error(__dirname + '/' + label + '.js');
            log.error('The result does not have the property', test.compare, JSON.stringify(theme, null, 2));
            return next();
          }

        } else if (test.compare) {

          result = theme[test.compare];
        }

        try {
          assert.deepEqual(test.expected, result);
        } catch (e) {

          var _level = log.level;
          log.level = 'debug';

          return Theme.compile(tmp, function(err, theme){
            log.error(__dirname + '/' + label + '.js');
            log.error(
              test.label, 'test failed and returned: \n'
              // JSON.stringify(theme, null, 2),
              // '\n Result should have this ', test.compare, '\n',
              // JSON.stringify(test.expected,null,2)
            );
            console.log(jsondiff.diffString(result, test.expected));
            log.level = _level;
            return next(); // throw e;
          });
        }

        log.info(chalk.green('✔ ' + test.label));


        next();
      });
    });
  }, function(){

    rimraf.sync(tmp);
    cb();
  });
};
