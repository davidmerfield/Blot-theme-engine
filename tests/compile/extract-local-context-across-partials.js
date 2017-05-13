module.exports = {
  label: 'Extract local context across partials',
  folder: {'index.html': '{{#name}}{{> partial.html}}{{/name}}', 'partial.html': '{{first}}'},
  compare: 'templates > /index.html > retrieve',
  expected: {
    "name": {
      "children": [
        "first"
      ],
      "parents": []
    },
    "first": {
      "children": [],
      "parents": [
        "name"
      ]
    }
  }
};