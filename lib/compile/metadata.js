var helper = require('helper');
var type = helper.type;

module.exports = function (attributes, callback) {

  var locals = {};
  var partials = {};
  var routes = [];

  // Normalize the metadata keys so
  // "Route:" and " route:" both match.
  // This lowercases and strips leading
  // and trailing whitespace.
  for (var i in attributes) {
    attributes[i.toLowerCase().trim()] = attributes[i];
  }

  // validate them then add them to locals
  if (validLocals(attributes.locals)) {

    locals = attributes.locals;

  } else if (attributes.locals) {

    return callback(new Error('Locals must be an object'));
  }

  if (validPartials(attributes.partials)) {

    partials = attributes.partials;

  } else if (attributes.partials) {

    return callback(new Error('Partials must be an object defining strings'));
  }

  if (attributes.routes) {
    // validate them first
    attributes.routes.forEach(function(route){
      routes.push(route);
    });
  }

  if (attributes.route) {
    // validate then
    routes.push(attributes.route);
  }

  return callback(null, locals, partials, routes);
};

function validLocals (val) {
  return type(val, 'object');
}

function validPartials (val) {
  if (!type(val, 'object')) return false;

  for (var i in val)
    if (!type(val[i],'string'))
      return false;

  return true;
}