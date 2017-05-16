module.exports = {
  label: 'Ignore templates files with bad syntax.',
  folder: {'/ignore.html': '{{#apple}}'},
  expected: {"templates": {}, "routes": [], "ignored": {
    "/ignore.html": "missing closing tag: apple"
  }}
};