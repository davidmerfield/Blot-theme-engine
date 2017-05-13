module.exports = {
  label: 'Extract partial from template',
  folder: {'/index.html': '{{> partial.html}}', '/partial.html': 'Partial!'},
  compare: 'templates',
  expected: {
    "/index.html": {
      "text": "{{> partial.html}}",
      "locals": {},
      "partials": {
        "partial.html": "Partial!"
      },
      "retrieve": {}
    },
    "/partial.html": {
      "text": "Partial!",
      "locals": {},
      "partials": {},
      "retrieve": {}
    }
  }
};