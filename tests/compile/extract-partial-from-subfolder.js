module.exports = {
  label: 'Extract partial from a subfolder',
  folder: {'/index.html': '{{> sub/partial.html}}', '/sub/partial.html': 'Wow!'},
  compare: 'templates > /index.html > partials',
  expected: {
    "sub/partial.html": "Wow!"
  }
};