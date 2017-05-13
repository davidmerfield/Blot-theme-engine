var hogan = require('hogan.js');

// var tree = ;
// var partialtree = hogan.parse(hogan.scan(partial), text, {});

// tree[0] = partialtree;
// console.log(tree);

// console.time('basicrender');
// var result = hogan.compile(text).render({name: 'david'});
// console.timeEnd('basicrender');


// tree.unshift(tree[0]);
// can manipulate tree
// tree[3].n = 'name';
// // tree = tree.concat(partialtree);
// var args = [1, 1, [0]];

// console.log(args);


var templates = {
  index: 'Hello {{name}} {{> partial}} ',
  partial: "there {{name}}"
};


for (var template in templates)
  templates[template] = hogan.parse(hogan.scan(templates[template]));

// finished reading all template files in
// folder from disk here.

for (var template in templates) {

  var tree = templates[template];

  for (var i = 0; i < tree.length;i++) {

    if (tree[i].tag === '>') {

      var partial = templates[tree[i].n];

      if (!partial) continue;

      Array.prototype.splice.apply(tree, [i, 1].concat(partial));
    }
  }
}

console.log(templates);


// console.log('BEFORE:',tree);
// console.log('AFTER:', tree)

// store and retrieve template
// from db at this point
var index = JSON.stringify(templates.index);

//retrieve the template string from db here
console.time('render');
index = JSON.parse(index);
var options = {};
var template = hogan.generate(index, null, options);
var result = template.render({name: 'David'}) ;
console.timeEnd('render');

console.log('output: "' + result + '"');