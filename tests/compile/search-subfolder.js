module.exports = {
  label: 'Search sub folders for template files',
  folder: {'parent.html': 'Parent!', 'child/template.html': 'Child!', 'deeply/nested/child/template.html': 'Nested Child!'},
  compare: 'templates',
  expected: {
    "/child/template.html": {
      "text": "Child!",
      "locals": {},
      "partials": {},
      "retrieve": {}
    },
    "/deeply/nested/child/template.html": {
      "text": "Nested Child!",
      "locals": {},
      "partials": {},
      "retrieve": {}
    },
    "/parent.html": {
      "text": "Parent!",
      "locals": {},
      "partials": {},
      "retrieve": {}
    }
  }
};