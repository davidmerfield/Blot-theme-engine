module.exports = {
  label: 'Extract partials from template metadata',
  folder: {'index.html': '---\nPartials:\n  foo: bar\n  baz: <html>\n---\n{{> foo}}'},
  compare: 'templates > /index.html',
  expected: {"tree":[{"tag":"_t","text": new String("bar")}],"locals":{},"retrieve":{}}
};