var fs = require('fs');
var join = require('path').join;
var FrontMatter = require('front-matter');

module.exports = function (root, path, callback) {

  var frontmatter, text, attributes;

  fs.readFile(join(root, path), 'utf-8', function(err, contents){

    if (err) return callback(err);

    try {
      frontmatter = FrontMatter(contents);
      text = frontmatter.body;
      attributes = frontmatter.attributes;
    } catch (e) {
      return callback(new Error('BADFMPARSE'));
    }

    return callback(null, text, attributes);
  });
};