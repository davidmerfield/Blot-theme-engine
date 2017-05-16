module.exports = {
  label: 'Extract partial from template',
  folder: {'/index.html': '{{> partial.html}}', '/partial.html': 'Partial!'},
  compare: 'templates > /index.html > tree',
  expected: [{tag: '_t', text: new String('Partial!')}]
};