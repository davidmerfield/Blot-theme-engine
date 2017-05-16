var log = require('log');
var PARTIAL = '>';
var LOCAL = '_v';
var LIST = '#';

function normalize (str) {
  if (str[0] !== '/') str = '/' + str;
  str = str.trim().toLowerCase();
  return str;
}

function findPartial (name, template, templates) {

  log.debug('finding partial named', name, 'from', template.partials);

  for (var i in template.partials)
    if (normalize(i) === normalize(name))
      return template.partials[i];

  log.debug('finding partial named', name, 'from', templates);

  for (var x in templates)
    if (normalize(x) === normalize(name)) {
      log.debug('found a partial named', x, 'for name', name);
      return templates[x];
    }


  return null;
}

function walk (templates, templatename, template, tree) {

  // Don't cast tree.length to a variable
  // since we might change it by importing
  // a partial's tree dynamically.
  for (var i = 0; i < tree.length;i++) {

    var node = tree[i];
    var name = node.n;

    // can we catch infinite nesting? recursive partials?
    // merge partials locals and partials with existing locals and partials
    // merge any front-matter data here:
    if (isPartial(node)) {

      // Prevent partials which embed themselves
      if (normalize(name) === normalize(templatename)) {
        throw new Error('INFINITE');
      }

      log.debug('looking for partials for template', templatename);

      var partial = findPartial(name, template, templates);

      // We couldn't find a partial with this name
      // consider logging this and showing it? Should
      // this be an error?
      if (!partial) throw new Error('MISSINGPARTIAL')

      log.debug('FOUND PARTIAL', i, name, normalize(name), normalize(templatename));
      log.debug('TREE BEFORE SPLICE:',tree);
      log.debug('PARTIAL TREE BEFORE SPLICE:',partial.tree);

      // For each top-level node in the tree, add the
      // parent from the node we're going to replace.
      // This allows us to compute the children and parents
      // properties of locals used by the partial.
      if (node.parent) partial.tree.map(function(c){
        c.parent = node.parent;
      });

      // Replace the 'partial' node with the nodes
      Array.prototype.splice.apply(tree, [i, 1].concat(partial.tree));

      log.debug('TREE AFTER SPLICE:',tree);

      // We decrement the index since we just replaced this node
      // with at least one other node
      i--;
      continue;
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

      node.nodes.forEach(function(c){
        c.parent = node;
      });

      walk(templates, templatename, template, node.nodes);
    }
  }
}

module.exports = function (templates, callback) {

  for (var templatename in templates) {

    var template = templates[templatename];

    // my goal is to find each partial and each local
    // for which there is a fetching function. for each
    // local, we also want to store a list of tokens
    // which are children, parents, and siblings.
    // the locals in a partial need to be passed an initial context too.
    try {
      walk(templates, templatename, template, template.tree);
    } catch (e) {
      return callback(e);
    }

    // If a local has been used multiple times
    // by a template then merge all the children
    // and parents properties into a single definition
    flatten(template.retrieve);

    delete template.partials;
    delete template.text;
  }

  callback(null, templates);
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