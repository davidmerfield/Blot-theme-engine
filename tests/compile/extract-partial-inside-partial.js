module.exports = {
  label: 'Extract partial inside a partial',
  folder: {'/index.html': '{{> partial.html}}', 'partial.html': '{{> deeper.html}}', 'deeper.html': 'Wow!'},
  compare: 'templates > /index.html > tree',
  expected: [{"tag":"_t","text": new String("Wow!")}]
};