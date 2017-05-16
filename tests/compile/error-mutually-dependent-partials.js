module.exports = {
  label: 'return an error for mutually dependent partials',
  folder: {'index.html': '{{> partial.html}}', 'partial.html': '{{> index.html}}'},
  error: 'INFINITE'
};