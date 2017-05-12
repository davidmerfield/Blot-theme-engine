module.exports = {
  label: 'Extract partials from template metadata',
  folder: {'index.html': '---\nPartials:\n  foo: bar\n  baz: <html>\n---'},
  compare: 'templates > index.html > partials',
  expected: {
    "foo": "bar",
    "baz": "<html>"
  }
};