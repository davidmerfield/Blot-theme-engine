var CONTENT = '/* HS */';
var NAME = '/index.js';
var folder = {};
folder[NAME] = CONTENT;

module.exports = {
  label: 'Turn JavaScript files into templates',
  folder: folder,
  compare: 'templates > ' + NAME +' > tree > 0 > text',
  expected: new String(CONTENT)
};