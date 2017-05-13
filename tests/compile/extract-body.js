module.exports = {
  label: 'Extract body from template',
  folder: {'text.html': 'Hello world!'},
  compare: 'templates > /text.html > text',
  expected: 'Hello world!'
};