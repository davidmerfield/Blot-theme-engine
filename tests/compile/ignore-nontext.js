module.exports = {
  label: 'Ignore templates files that are not text.',
  folder: {'/ignore.json': '{}', '/also-ignore.app': 'this'},
  expected: {"templates": {}, "routes": [], "ignored": {
    "/also-ignore.app": "BADMIME",
    "/ignore.json": "BADMIME"
  }}
};