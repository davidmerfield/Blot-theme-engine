var CONTENT = '<rss>';
var NAME = '/index.rss';
var folder = {};
folder[NAME] = CONTENT;

module.exports = {
  label: 'Turn RSS files into templates',
  folder: folder,
  compare: 'templates > ' + NAME +' > tree > 0 > text',
  expected: new String(CONTENT)
};