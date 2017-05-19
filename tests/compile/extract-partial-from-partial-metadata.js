module.exports = {
  label: 'Extract partials from metadata of a partial',
  folder: {'partial.html': '---\nPartials:\n  foo: bar\n  baz: <html>\n---\n{{> foo}}', 'index.html': '{{> partial.html}}'},
  compare: 'templates > /index.html',
  expected: {"tree":[{"tag":"_t","text": new String("bar")}],"locals":{},"retrieve":{}}
};