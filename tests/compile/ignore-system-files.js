module.exports = {
  label: 'Ignore system files',
  folder: {'thumbs.db': 'No!', '__MACOSX': 'No!'},
  expected: {"templates": {}, "routes": [], "ignored": [["/__MACOSX", "HIDDENFILE"], ["/thumbs.db", "HIDDENFILE"]]}
};