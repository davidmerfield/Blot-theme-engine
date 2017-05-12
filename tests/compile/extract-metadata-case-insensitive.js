module.exports = {
  label: 'Ignore case-sensitivity for template metadata keys',
  folder: {'index.html': '---\nrOuTe : /c\nrOuTes:\n- /a\n- /b\n---'},
  compare: 'routes',
  expected: ["/a","/b","/c"],
};