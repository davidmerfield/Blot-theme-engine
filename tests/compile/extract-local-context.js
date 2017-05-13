module.exports = {
  label: 'Extract local context from template',
  folder: {'index.html': '{{#user}}{{age}}{{#name}}{{first}}{{/name}}{{/user}}'},
  compare: 'templates > /index.html > retrieve',
  expected: {
    "user": {
      "children": [
        "age",
        "name",
        "first"
      ],
      "parents": []
    },
    "age": {
      "children": [],
      "parents": [
        "user"
      ]
    },
    "name": {
      "children": [
        "first"
      ],
      "parents": [
        "user"
      ]
    },
    "first": {
      "children": [],
      "parents": [
        "name",
        "user"
      ]
    }
  }
};