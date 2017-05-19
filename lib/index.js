var compile = require('./compile');
var store = require('./store');
var router = require('./router');
var render = require('./render');

module.exports = {

  compile: compile,

  router: router,

  render: render,

  store: store,

  // update merges the store and compile functions
  update: function(path, callback) {

    compile(path, function(err, theme){

      if (err) return callback(err);

      store.setTheme(path, theme, callback);
    });
  },

  middleware: function (lookup, options) {

    return function (req, res, next) {

      var checkParams = options.params || {};
      var retrieveLocals = options.retrieve || {};

      lookup(req, res, function(err, themeID){

        if (err) return next(err);

        store.getRoutes(themeID, function(err, routes){

          if (err) return next(err);

          router(routes, checkParams, req, res, function(err, templateID, params){

            if (err) return next(err);

            store.getTemplate(themeID, templateID, function(err, template){

              if (err) return next(err);

              render(template, locals, req, res, next);
            });
          });
        });
      });
    };
  }
};