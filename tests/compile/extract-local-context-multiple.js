module.exports = {
  label: 'Extract complete context when a local is used multiple times',
  folder: {'index.html': '{{#name}}{{first}}{{/name}}{{#name}}{{last}}{{/name}}'},
  compare: 'templates > /index.html > retrieve',
  expected: {
    "name": {
      "children": [
        "first",
        "last"
      ],
      "parents": []
    },
    "first": {
      "children": [],
      "parents": [
        "name"
      ]
    },
    "last": {
      "children": [],
      "parents": [
        "name"
      ]
    }
  }
};