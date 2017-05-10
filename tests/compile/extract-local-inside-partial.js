module.exports = {
  label: 'Extract local inside a partial',
  folder: {'index.html': '{{> partial.html}}', 'partial.html': '{{full-name}}!'},
  compare: 'templates > index.html > retrieve',
  expected: {
    "full-name": {
    "children": [],
    "parents": ["partial.html"]
    }
  }
};