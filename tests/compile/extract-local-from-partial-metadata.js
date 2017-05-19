module.exports = {
  label: 'Extract local from metadata of a partial',
  folder: {'partial.html': '---\nLocals:\n  foo: bar\n  baz: <html>\n---\n{{foo}}', 'index.html': '{{> partial.html}}'},
  compare: 'templates > /index.html > retrieve',
  expected: {foo: {children: [], parents: []}}
};