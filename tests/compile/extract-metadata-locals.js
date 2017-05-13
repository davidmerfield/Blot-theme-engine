module.exports = {
  label: 'Extract locals from template metadata',
  folder: {'index.html': '---\nLocals:\n  foo: bar\n  baz: [1,2,3]\n---'},
  compare: 'templates > /index.html > locals',
  expected: {
    "foo": "bar",
    "baz": [
      1,
      2,
      3
  ],
  }
};