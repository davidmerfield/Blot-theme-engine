var valid = ['/apple', '/banana', '/cherry'];

// should every param proceed to next entry if
// nothing matches? for instance, :tag or :date etc..
// Sometimes it might be useful to show a specific error
// page if nothing matches a specific route, e.g.
// /tags/:tag but other times we might want to do something
// like /:category for a magazine, e.g. /news /sport /art
// and not capture absolutely every request...

// perhaps blot could offer some special parameters
// e.g. tag, metadata, date, permalink which only match
// under certain conditions. custom parameters could be
// used to match regardless, then these custom parameters
// could be used to list posts, e.g. posts-tagged-:customparam

// these params should be stackable? /tag/:tag/:date* ???
// what about /:MM/:YYYY params?
// these params should each be able to modify the {{matched-posts}} list
module.exports = function (req, value, callback) {

  if (valid.indexOf('/' + value) > -1) return callback();

  callback(new Error('Not a permalink'));
};