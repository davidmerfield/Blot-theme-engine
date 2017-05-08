var fs = require('fs');
var walk = require('./walk');
var metadata = require('./metadata');
var FrontMatter = require('front-matter');
var join = require('path').join;

// For each template in a theme, my goal is to have:
// - body:     the template's content without its metadata
// - partials: a dictionary of all the partial templates defined in the
//             template's metadata and theme needed for this template.
// - locals:   a dictionary of all the local variables declared ahead-of-time
//             in the template's metadata and the theme's metadata
// - retrieve: a dictionary of all the locals needed to render it.
//             each definition is a list of parent tokens and child tokens

module.exports = function read (root, path, callback) {

  var template, parsed, body, attributes;

  console.log('reading', root, path);

  fs.readFile(join(root, path), 'utf-8', function(err, contents){

    try {
      parsed = FrontMatter(contents);
      body = parsed.body;
      attributes = parsed.attributes;
    } catch (e) {
      return callback(new Error('Parsing metadata from ' + path + ' failed.'));
    }

    metadata(attributes, function(err, locals, partials, routes){

      if (err) return callback(err);

      if (!routes.length) routes.push(path);

      template = {
        body: body,
        locals: locals,
        partials: partials,
        retrieve: {}
      };

      // Work out which local variables we need to retrieve
      // at render time. Also work out which partials are used
      // and store them in the template. For each partial, work
      // out the locals variables needed and repeat...
      walk(root, template, function(err, template){

        if (err) return callback(err);

        callback(null, template, routes);
      });
    });
  });
};