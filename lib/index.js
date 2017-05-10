var compile = require('./compile');
var store = require('./store');
var router = require('./router');
var render = require('./render');

module.exports = {

  compile: compile,

  store: store,

  update: function(path, callback) {

    compile(path, function(err, theme){

      if (err) return callback(err);

      store(path, theme, callback);
    });
  },

  router: router,

  render: render,

  middleware: function(options) {

    return function(req, res, next) {

      var path = options.lookup(req, res);

      router(path, options.params)(req, res, function(err){

        if (err) return next(err);

        render(path, options.locals)(req, res, function(err){

          if (err) return next(err);

          // the response should have been sent, no need to call next!
        });
      });
    }
  }
};