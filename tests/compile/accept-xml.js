var CONTENT = '<xml></xml>';

module.exports = {
  label: 'Turn XML files into templates',
  folder: {'index.xml': CONTENT, 'index.rss': CONTENT},
  compare: 'templates',
  expected: {
    "index.rss": {"body": CONTENT, "locals": {}, "partials": {}, "retrieve": {} },
    "index.xml": {"body": CONTENT, "locals": {}, "partials": {}, "retrieve": {} }
  }
};