module.exports = {
  label: 'Ignore templates files that begin with a dot.',
  folder: {'.dotfile.html': 'No!', '.hidden/folder.html': 'No again!'},
  expected: {"templates": {}, "routes": [], "ignored": [
    ".dotfile.html",
    ".hidden"
  ]}
};