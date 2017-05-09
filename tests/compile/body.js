module.exports = {
  label: 'Extract body from template',
  folder: {'body.html': 'Hello world!'},
  compare: 'templates > body.html > body',
  expected: 'Hello world!'
};