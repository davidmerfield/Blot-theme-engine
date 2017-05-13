var CONTENT = '# Wow';

module.exports = {
  label: 'Turn TXT files into templates',
  folder: {'index.txt': CONTENT, 'index.rtf': CONTENT, 'index.md': CONTENT},
  compare: 'templates',
  expected: {
    "/index.txt": {"text": CONTENT, "locals": {}, "partials": {}, "retrieve": {} },
    "/index.rtf": {"text": CONTENT, "locals": {}, "partials": {}, "retrieve": {} },
    "/index.md": {"text": CONTENT, "locals": {}, "partials": {}, "retrieve": {} }
  }
};