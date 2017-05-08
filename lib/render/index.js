var hogan = require('hogan.js');
var db = require('../store');
var helper = require('helper');
var forEach = helper.forEach;
var extend = helper.extend;

module.exports = function (path, locals) {

  return function (req, res, callback) {

    console.time('render');

    var compiled, rendered;

    res.partials = res.partials || {};
    res.locals = res.locals || {};

    console.time('load template');

    db.template.get(res.template, function(err, template){

      console.timeEnd('load template');

      if (err) return callback(err);

      if (!template) return callback(new Error('no template'));

      console.time('parse template');

      template = JSON.parse(template);

      extend(res.partials)
        .and(template.partials);

      extend(res.locals)
        .and(template.locals);

      compiled = hogan.compile(template.source);

      console.timeEnd('parse template');

      console.time('load locals');

      // load((template.retrieve, req, res, function(){

      // });

      forEach.parallel(template.retrieve, load(locals), function(){
        console.timeEnd('load locals');

        rendered = compiled.render(res.locals, res.partials);

        console.timeEnd('render');
        res.send(rendered);
      });
    });
  };
};