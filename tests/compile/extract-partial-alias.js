module.exports = {
  label: 'Extract aliased partial',
  folder: {'/index.html': '{{> head}}', '/head.html': 'Wow!'},
  compare: 'templates > /index.html > tree',
  expected: [{"tag":"_t","text": new String("Wow!")}]
};