var CONTENT = 'WOW';
var NAME = '/index.txt';
var folder = {};
folder[NAME] = CONTENT;

module.exports = {
  label: 'Turn text files into templates',
  folder: folder,
  compare: 'templates > ' + NAME +' > tree > 0 > text',
  expected: new String(CONTENT)
};