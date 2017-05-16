var key = require('./key');
var client = require('./client');

module.exports = function (path, name, callback) {

  client.get(key.template(path, name), function(err, template){

    if (err) return callback(err);

    try {
      template = JSON.parse(template);
    } catch (e) {
      return callback(e);
    }

    return callback(null, template);
  });
};