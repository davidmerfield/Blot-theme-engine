var CONTENT = 'WOW';
var NAME = '/index.md';
var folder = {};
folder[NAME] = CONTENT;

module.exports = {
  label: 'Turn markdown files into templates',
  folder: folder,
  compare: 'templates > ' + NAME +' > tree > 0 > text',
  expected: new String(CONTENT)
};