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

      function redo (cb) {

        var _level = log.level;
        log.level = 'debug';

        Theme.compile(tmp, function(err, theme){
          log.level = _level;
          log.error(__dirname + '/' + label + '.js');
          cb(err, theme);
        });
      }

      Theme.compile(tmp, function(err, theme){

        if (test.error && err && (err.message === test.error || err.code === test.error)) {

          log.info(chalk.green('✔ ' + test.label));
          return next();

        } else if (test.error) {

          return redo(function(_err, _theme){
            log.error('should have returned an error with code or message', test.error, 'but returned:');
            log.error('Error:', err);
            log.error('Theme:', theme);
            log.debug(err);
            next();
          });

        } else if (err) {

          return redo(function(_err, _theme){
            log.error('should not have returned an error but returned:');
            log.error('Error:', err);
            log.error('Theme:', theme);
            log.debug(err);
            next();
          });
        }

        var result = theme;
        var compare;

        if (test.compare) compare = test.compare.split(' > ');

        if (test.compare && compare.length > 1) {

          try {
            compare.forEach(function(selector){
              result = result[selector];
            });
          } catch (e) {

            return redo(function(err, theme){

              log.error('The result does not have the property', test.compare, JSON.stringify(theme, null, 2));
              next();
            });
          }

        } else if (test.compare) {

          result = theme[test.compare];
        }

        try {
          assert.deepEqual(test.expected, result);
        } catch (e) {

          return redo(function(err, theme){

            log.debug(err);
            log.error(__dirname + '/' + label + '.js');
            log.error(
              test.label, 'test failed and returned: \n'
              // JSON.stringify(theme, null, 2),
              // '\n Result should have this ', test.compare, '\n',
              // JSON.stringify(test.expected,null,2)
            );
            console.log(jsondiff.diffString(result, test.expected));
            log.debug(result);
            next();
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
