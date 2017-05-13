module.exports = {
  label: 'Turn a folder containing an empty file into a template',
  folder: {'index.html': ''},
  compare: 'templates',
  expected: {
    "/index.html": {
      "text": "",
      "locals": {},
      "partials": {},
      "retrieve": {}
    }
  }
};