var client = require('./client');
var key = require('./key');

module.exports = function (path, theme, callback) {

  var multi = client.multi();
  var pairs = [];
  var keys = [];
  var routes, ignored, template;

  // i want to be able to retrieve a list of routes
  // find a match, then retrieve the specific template
  // for that match quickly
  client.SMEMBERS(key.everything(path), function(err, oldkeys){

    if (err) return callback(err);

    if (oldkeys && oldkeys.length) multi.del(oldkeys);

    // Stringify the list of routes
    try {
      routes = JSON.stringify(theme.routes);
    } catch (e) {
      return callback(new Error('Routes are invalid JSON'));
    }

    pairs.push(key.routes(path));
    pairs.push(routes);

    // Stringify the dictionary of ignored files
    try {
      ignored = JSON.stringify(theme.ignored);
    } catch (e) {
      return callback(new Error('Ignored files are invalid JSON'));
    }

    pairs.push(key.ignored(path));
    pairs.push(ignored);

    // Set templates files
    for (var templatefile in theme.templates) {
      pairs.push(key.template(path, templatefile));
      try {
        template = JSON.stringify(theme.templates[templatefile]);
      } catch (e) {
        return callback(new Error('Templates contain invalid JSON'));
      }
      pairs.push(template);
    }

    keys = pairs.filter(function(n,i){
      return i % 2 === 0;
    });

    multi.mset(pairs);
    multi.SADD(key.everything(path), keys);

    multi.exec(function(err){

      if (err) return callback(err);

      callback();
    });
  });
};
