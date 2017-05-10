var CONTENT = '# Wow';

module.exports = {
  label: 'Turn TXT files into templates',
  folder: {'index.txt': CONTENT, 'index.rtf': CONTENT, 'index.md': CONTENT},
  compare: 'templates',
  expected: {
    "index.txt": {"body": CONTENT, "locals": {}, "partials": {}, "retrieve": {} },
    "index.rtf": {"body": CONTENT, "locals": {}, "partials": {}, "retrieve": {} },
    "index.md": {"body": CONTENT, "locals": {}, "partials": {}, "retrieve": {} }
  }
};