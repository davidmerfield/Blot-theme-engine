var Theme = require('../../lib');
var hogan = require('hogan.js');
var forEach = require('helper').forEach;

var path = __dirname + '/theme';

Theme.compile(path, function (err, theme) {

  if (err) throw err;

  Theme.store.theme(path, theme, function(err){

    if (err) throw err;

    Theme.store.routes(path, function(err, routes){

      if (err) throw err;

      Theme.store.template(path, routes[2][1], function(err, template){

        if (err) throw err;

        console.log(template);
        template = hogan.generate(template.tree, null, {});
        console.log('OUTPUT:', template.render({}));
      });
    });
  });
});