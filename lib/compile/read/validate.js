var fs = require('fs');
var log = require('log');
var join = require('path').join;
var matches = require("minimatch");
var mimetype = require('mime-types');

// I figure that 2mb is a healthy maximum
// size for an HTML or CSS or JS file.
var MAX_SIZE = 2 * 1000 * 1000; // 2 mb

// Blacklist of system files
var IGNORE = [
  '.*',
  '__MACOSX',
  'thumbs.db',
  'ehthumbs.db',
  'desktop.ini',
];

// Whitelist of mime-types
// which we can use for templates
var VALID = [
  'text/*',
  'application/rtf',
  'application/javascript',
  'application/rss+xml',
  'application/xml'
];

// Template files and must be smaller than 2mb and not start with a period ('.').
// The file must have one of the following extensions:
//   - HTML (.html)
//   - JavaScript (.js)
//   - CSS (.css)
//   - Text (.txt, .md)
//   - XML/RSS (.rss, .xml)

// Please note, you can add other types of files, including images and videos, into
// your theme's directory. You can reference these files as static assets in your
// templates. Blot will just not attempt to convert them into templates.

// Callback takes two bools: isDir and isTemplate
module.exports = function (root, path, callback) {

  var directories = path.split('/');

  for (var i = 0; i < IGNORE.length; i++)
    for (var x = 0; x < directories.length;x++)
      if (matches(directories[x], IGNORE[i]))
        return callback(new Error('HIDDENFILE'));

  fs.stat(join(root, path), function(err, stat){

    // We need to handle this error properly
    // Some errors might need to be retried.
    // Others might not (e.g. ENOENT).
    // This probably happened because the file
    // was deleted inbetween this function and
    // the caller function. Maybe a sync?
    if (err) return callback(err);

    // We need to check if the path refers to a directory
    // before we check the mimetype.
    if (stat.isDirectory()) return callback(new Error('EISDIR'));

    // Ignore files which are too large
    if (stat.size > MAX_SIZE) return callback(new Error('TOOLARGE'));

    // Based on the file's extension
    var mime = mimetype.lookup(path);

    log.debug('Found mime', mime, path);

    // We don't know a mimetype for this file
    if (!mime) return callback(new Error('BADMIME'));

    // See if the mimetype is on the whitelist
    for (var j = 0; j < VALID.length; j++)
      if (matches(mime, VALID[j]))
        return callback(null);

    // The file is not on the whitelist
    return callback(new Error('BADMIME'));
  });
};

