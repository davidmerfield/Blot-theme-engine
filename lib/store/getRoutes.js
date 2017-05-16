var key = require('./key');
var client = require('./client');

module.exports = function (path, callback) {

  client.get(key.routes(path), function(err, routes){

    if (err) return callback(err);

    try {
      routes = JSON.parse(routes);
    } catch (e) {
      return callback(e);
    }

    return callback(null, routes);
  });
};