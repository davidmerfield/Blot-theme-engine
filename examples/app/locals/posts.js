/*
post properties:
 - status [draft, page, published, scheduled, deleted] ? should these be individual bools?
 - title
 - title-html
 - url
 - content
 - text
 - excerpt
 - path
 - tags
 - title
 - date
 - type [text, markdown, album, image etc...]

 https://codex.wordpress.org/Class_Reference/WP_Post
 http://cargocollective.com/developers/reference

*/


module.exports = function (token, req, res, callback) {

  // Can we use route parameters in these?
  // like :metadata in a particular tag?
  // {{#posts-on-:date}}, where :date is a route parameter?
  // That way, we don't need to write much logic for the
  // route parameters? For instance, we could just do
  // {{#posts-tagged-:tag}}
  // and have zero logic for the param option!? What if the user
  // wants to proceed to a different route if no posts match?
  // perhaps they could stack stuff:
  // {{#posts-tagged-:tag.length}}
  // {{/posts-tagged-:tag.length}}

  // alternatively, we could match posts
  // you can also ! the tokens?
  // {{posts-not-tagged-apple}}?
  // {{posts-without-metadata-author}}?
  // {{posts-not-in-Issues}}?

  // normalize properties so all these match:
  // David-Merfield
  // daViD_Merfield
  // david merfield

  // {{posts-where-metadata-author-is-:author}}

  // {{posts-where-PROPERTY-is-MATCH}}

  // {{#posts-tagged-apple-in-/posts-sorted-by-newest}}

  // we need to paginate this list
  if (token.parents.indexOf('page') > -1) {

  }

  // we need to find posts tagged x
  // somehow support 'not-' and '-and-' ?? maybe in future?
  if (token.name.indexOf('tagged-')) {

  }

  // find posts after certain date
  // e.g. posts-after-
  if (token.name.indexOf('published-after-')) {

  }

  // find posts before certain date
  if (token.name.indexOf('published-before-')) {

  }

  // find posts on a certain date
  // could function as range, published-on-2016
  if (token.name.indexOf('published-on-')) {

  }

  // find posts whose path matches particular folder
  if (token.name.indexOf('in-')) {

  }

  // {{#posts-with-metadata-author-:author}}

  // {{/posts-with-metadata-author-:author}}

  // find posts with a particular metadata property
  if (token.name.indexOf('with-metadata-')) {

  }

  console.log('retrieving posts now!', token);

  // now sort them if applicable...
  // options: oldest, path, name (default is latest)
  if (token.name.indexOf('sorted-by-')) {

  }

  return callback();
}