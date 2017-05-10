module.exports = {
  label: 'Extract partial inside a partial',
  folder: {'index.html': '{{> partial.html}}', 'partial.html': '{{> deeper.html}}', 'deeper.html': 'Wow!'},
  compare: 'templates > index.html > partials',
  expected: {
    "partial.html": "{{> deeper.html}}",
    "deeper.html": "Wow!"
  }
};