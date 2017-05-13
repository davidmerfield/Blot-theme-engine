var CONTENT = '//';

module.exports = {
  label: 'Turn JS files into templates',
  folder: {'index.js': CONTENT},
  compare: 'templates',
  expected: {"/index.js": {"text": CONTENT, "locals": {}, "partials": {}, "retrieve": {} } }
};