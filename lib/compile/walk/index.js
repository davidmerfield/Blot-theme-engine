var helper = require('helper');
var parse = require('./parse');
var forEach = helper.forEach.parallel;

var PARTIAL = '>';
var LOCAL = '_v';
var LIST = '#';

module.exports = function (read, template, callback) {

  parse(template.text, function(err, tree){

    if (err) return callback(err);

    // my goal is to find each partial and each local
    // for which there is a fetching function. for each
    // local, we also want to store a list of tokens
    // which are children, parents, and siblings.
    // the locals in a partial need to be passed an initial context too.
    forEach(tree, function process (node, next){

      var name = node.n;

      // See if the node is a partial template
      checkPartial(node, read, function(err, node, partial){

        // can we catch infinite nesting? recursive partials?
        // merge partials locals and partials with existing locals and partials
        // merge any front-matter data here:
        if (partial) {
          template.partials[name] = partial.text;
        }

        // we need to store all the instances
        // of each tag since the walker hasn't reached
        // a leaf node yet and doesn't know all the node's
        // children. once the tree is explored we merge
        // the parents and children of each token together.
        if (isLocal(node)) {

          node.children = [];
          node.parents = parents(node);

          template.retrieve[name] = template.retrieve[name] || [];
          template.retrieve[name].push(node);
        }

        if (node.nodes) {
          node.nodes.map(function(c){c.parent = node;});
          return forEach(node.nodes, process, next);
        }

        next();
      });
    }, function(){

      try {
        flatten(template.retrieve);
      } catch (e) {
        return callback(e);
      }

      callback(null, template);
    });
  });
};

function parents (node) {

  var list = [];
  var parent = node.parent;

  while (parent) {

    if (isLocal(parent)) list.push(parent.n);

    if (parent.children) parent.children.push(node.n);

    parent = parent.parent;
  }

  return list;
}

function checkPartial (node, read, callback) {

  if (!isPartial(node)) return callback(null, node, null);

  var path = node.n;

  if (path[0] !== '/') path = '/' + path;

  path = path.trim().toLowerCase();

  read(path, function(err, template){

    if (err) return callback(err);

    parse(template.text, function(err, tree){

      if (err) return callback(err);

      node.nodes = tree;

      return callback(null, node, template);
    });
  });
}

function flatten (retrieve) {

  Object.keys(retrieve).forEach(function(i){

    if (retrieve[i].length === 1)
      retrieve[i].push({name: '', children: [], parents:[]});

    retrieve[i] = retrieve[i].reduce(merge);
  });
}

function merge (acc, val) {

  return {
    children: unique(acc.children, val.children),
    parents: unique(acc.parents, val.parents)
  };
}

function unique (a,b) {
  return a.concat(b).filter(function(value, index, self){
    return self.indexOf(value) === index;
  });
}

function isPartial (node) {
  return node && node.tag && node.tag === PARTIAL;
}

function isLocal (node) {
  return node && node.tag && (node.tag === LOCAL || node.tag === LIST);
}