module.exports = {
  label: 'Search sub folders for template files',
  folder: {'parent.html': 'Parent!', 'child/template.html': 'Child!', 'deeply/nested/child/template.html': 'Nested Child!'},
  compare: 'templates',
  expected: {
    "child/template.html": {
      "body": "Child!",
      "locals": {},
      "partials": {},
      "retrieve": {}
    },
    "deeply/nested/child/template.html": {
      "body": "Nested Child!",
      "locals": {},
      "partials": {},
      "retrieve": {}
    },
    "parent.html": {
      "body": "Parent!",
      "locals": {},
      "partials": {},
      "retrieve": {}
    }
  }
};