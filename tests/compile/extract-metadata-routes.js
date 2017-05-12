module.exports = {
  label: 'Extract routes from template metadata',
  folder: {'index.html': '---\nRoutes:\n- /a/b/c\n- /d/e\n---'},
  compare: 'routes',
  expected: ["/a/b/c", "/d/e"],
};