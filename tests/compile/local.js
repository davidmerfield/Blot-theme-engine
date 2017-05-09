module.exports = {
  label: 'Extract local from template',
  folder: {'local.html': '{{local}}'},
  compare: 'templates > local.html > retrieve',
  expected: {local: {children: [], parents: []}}
};