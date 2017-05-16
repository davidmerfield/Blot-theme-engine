module.exports = {
  label: 'Turn empty files into templates',
  folder: {'/index.html': ''},
  compare: 'templates > /index.html > tree',
  expected: []
};