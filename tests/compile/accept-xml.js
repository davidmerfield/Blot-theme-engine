var CONTENT = '<xml></xml>';
var NAME = '/index.xml';
var folder = {};
folder[NAME] = CONTENT;

module.exports = {
  label: 'Turn XML files into templates',
  folder: folder,
  compare: 'templates > ' + NAME +' > tree > 0 > text',
  expected: new String(CONTENT)
};