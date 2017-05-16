module.exports = {
  label: 'Search sub folders for template files',
  folder: {'parent.html': 'Parent!', 'child/template.html': 'Child!', 'deeply/nested/child/template.html': 'Nested Child!'},
  compare: 'templates',
  expected: {
    "/child/template.html": {
      "tree": [{"tag":"_t","text": new String("Child!")}],
      "locals":{},
      "retrieve":{}
    },
    "/deeply/nested/child/template.html":{
      "tree":[{"tag":"_t","text": new String("Nested Child!")}],
      "locals":{},
      "retrieve":{}
    },
    "/parent.html":{
      "tree":[{"tag":"_t","text": new String("Parent!")}],
      "locals":{},
      "retrieve":{}
    }
  }
};