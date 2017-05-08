function get () {
  client.lrange('routes', 0, -1, function(err, routes){});
}

function set () {

}

module.exports = {get: get, set: set};