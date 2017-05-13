module.exports = {
  label: 'Share partial template with multiple templates.',
  folder: {'index.html': '{{> head.html}} A', 'page.html': '{{> head.html}} B', 'head.html': '<head>', },
  compare: 'templates',
  expected: {
    "/head.html": {
      text: "<head>",
      locals: {},
      partials: {},
      retrieve: {}
    },
    "/index.html": {
      text: "{{> head.html}} A",
      locals: {},
      partials: {"head.html": "<head>"},
      retrieve: {}
    },
    "/page.html": {
      text: "{{> head.html}} B",
      locals: {},
      partials: {"head.html": "<head>"},
      retrieve: {}
    }
  }
};