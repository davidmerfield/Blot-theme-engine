var log = require('log');
var frontmatter = require('./frontmatter');
var validate = require('./validate');
var parse = require('./parse');
var metadata = require('./metadata');

// For each template in a theme, my goal is to have:
// - text:     the template's content without its metadata
// - partials: a dictionary of all the partial templates defined in the
//             template's metadata and theme needed for this template.
// - locals:   a dictionary of all the local variables declared ahead-of-time
//             in the template's metadata and the theme's metadata
// - retrieve: a dictionary of all the locals needed to render it.
//             each definition is a list of parent tokens and child tokens
module.exports = function (root, path, callback) {

  var template;

  log.debug('Reading', root, path);

  validate(root, path, function(err){

    if (err) return callback(err);

    frontmatter(root, path, function(err, text, attributes){

      if (err) return callback(err);

      metadata(attributes, function(err, locals, partials, routes){

        if (err) return callback(err);

        parse(text, function(err, tree){

          if (err) return callback(err);

          // By default, make the template file available
          // at its relative path to the template folder.
          if (!routes.length) {
            routes.push(path);
          }

          template = {
            text: text,
            tree: tree,
            locals: locals,
            partials: partials,
            retrieve: {}
          };

          callback(null, template, routes);
        });
      });
    });
  });
};