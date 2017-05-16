module.exports = {
  label: 'return an error for recursive partials',
  folder: {'index.html': '{{> index.html}}'},
  error: 'INFINITE'
};