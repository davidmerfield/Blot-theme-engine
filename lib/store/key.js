var PREFIX = 'theme';

module.exports = {
  prefix: PREFIX,
  everything: function(path) {return [PREFIX, path, 'everything'].join(':');},
  routes: function(path) {return [PREFIX, path, 'routes'].join(':');},
  template: function(path, name) {return [PREFIX, path, 'template', name].join(':');},
  ignored: function(path) {return [PREFIX, path, 'ignored'].join(':');}
};
