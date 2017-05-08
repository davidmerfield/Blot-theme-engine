var type = require('helper').type;

module.exports = function (req, value, callback) {

  console.log();

  if (type(parseInt(value), 'number') && !isNaN(parseInt(value)))
    return callback();

  callback(new Error('Number should be a number'));
};