var redis = require('redis');
var client = redis.createClient(6666);

module.exports = client;