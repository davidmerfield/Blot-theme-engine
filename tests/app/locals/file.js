var blogDir = __dirname + '/../../../blog';
var fs = require('fs');
var joinpath = require('path').join;


// app.param('path', function(req, res, next, value){

// });

// app.param(['a', 'b'], function(){

// });

// app.param(function(value), function(req, res, next, value){

// });

// module.exports = {
//   match: {},
//   retrieve: function(){

//   }
// };

// app.param(

//   // Check a param to see if it
//   // is a valid file...
//   function(value, callback){

//   },

//   // If so, load the file from disk
//   function(req, res, next, value){

//   }
// );

// app.local('file', function(req, res, next, token){

// });

var PREFIX = '';

// function match (key) {
//   return ...;
// }

// function load (req, res, context, callback) {

// }


// function load (req, res, token, callback) {

//   token.siblings (arr)
//   token.parents (arr)
//   token.name (string)
//   token.children (arr)

//   path = =;

//   for (var i in parents)
//     if (match (i))
//       path = parents[i] + path;
// }

function file (req, res, next, token) {

  var identifier = key.slice(PREFIX.length);
  var path = joinpath(blogDir, identifier.toLowerCase().trim());

  fs.readFile(path, 'utf-8', function(err, contents){

    if (err) return callback();

    // map welcome.txt to

    // {file:welcome: {txt: file}};

    // identifier.split('.').forEach(function(sub){
    //   file[sub] = {};
    // });

    var file = {
      html: contents,
      foo: 'bar'
    };

    var substrings = identifier.split('.');

    res.locals[PREFIX + substrings[0]] = {};

    var context = res.locals[PREFIX + substrings[0]];

    for (var i = 1;i < substrings.length;i++) {

      if (i === substrings.length -1) {
        context[substrings[i]] = file;
      } else {
        context[substrings[i]] = {};
      }

      context = context[substrings[i]];

    }

    callback();
  });
}

file.prefix = PREFIX;

module.exports = file;