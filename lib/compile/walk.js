var FrontMatter = require('front-matter');
var hogan = require('hogan.js');
var helper = require('helper');
var join = require('path').join;
var forEach = helper.forEach.parallel;
var PARTIAL = '>';
var LOCAL = '_v';
var LIST = '#';
var fs = require('fs');

module.exports = function (root, template, callback) {

  var tree;

  try {
    tree = hogan.parse(hogan.scan(template.body));
  } catch (e) {
    return callback(e);
  }

  walk([], tree, function(){

    for (var i in template.retrieve) {

      if (template.retrieve[i].length === 1)
        template.retrieve[i].push({name: '', children: [], parents:[]});

      template.retrieve[i] = template.retrieve[i].reduce(merge);
    }

    return callback(null, template);
  });

  // my goal is to find each partial and each local
  // for which there is a fetching function. for each
  // local, we also want to store a list of tokens
  // which are children, parents, and siblings.
  // the locals in a partial need to be passed an initial context too.

  function walk (context, branch, callback) {

    forEach(branch, function(node, nextNode){

      var name = node.n;
      var tag = node.tag;

      if (tag === PARTIAL) {

        // can we catch infinite nesting? recursive partials?
        template.partials[name] = FrontMatter(fs.readFileSync(join(root, name), 'utf-8')).body;

        // merge partials locals and partials with existing locals and partials

        // we need to add in any front0matter data here:
        node.nodes = hogan.parse(hogan.scan(template.partials[name]));
      }

      if (name) {

        node.children = [];

        node.parents = context.filter(function(node){
          return node.n;
        }).map(function(node){
          return node.n;
        });

        context.map(function(parent) {
          parent.children.push(name);
        });

      }

      if ((tag === LOCAL || tag === LIST)) {

        // we need to store all the instances
        // of each tag since the walker hasn't reached
        // a leaf node yet and doesn't know all the node's
        // children. once the tree is walked we reduce
        // all the instances of one token to a single local
        template.retrieve[name] = template.retrieve[name] || [];
        template.retrieve[name].push(node);
      }

      if (node.nodes) {
        var newContext = context.slice();
        newContext.push(node);
        var kids = node.nodes.slice();
        walk(newContext, kids, nextNode);
        return;
      }

      return nextNode();

    }, callback);
  }
};

function merge (acc, val) {
  return {
    // name: acc.n,
    children: acc.children.concat(val.children).filter(unique),
    parents: acc.parents.concat(val.parents).filter(unique)
  };
}

function unique (value, index, self) {
    return self.indexOf(value) === index;
}
