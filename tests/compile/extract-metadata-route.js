module.exports = {
  label: 'Extract route from template metadata',
  folder: {'index.html': '---\nRoute: /a/b/c\n---'},
  compare: 'routes',
  expected: ["/a/b/c"],
};