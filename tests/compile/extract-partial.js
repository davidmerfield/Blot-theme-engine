module.exports = {
  label: 'Extract partial from template',
  folder: {'index.html': '{{> partial.html}}', 'partial.html': 'Partial!'},
  compare: 'templates',
  expected: {
    "index.html": {
      "body": "{{> partial.html}}",
      "locals": {},
      "partials": {
        "partial.html": "Partial!"
      },
      "retrieve": {}
    },
    "partial.html": {
      "body": "Partial!",
      "locals": {},
      "partials": {},
      "retrieve": {}
    }
  }
};