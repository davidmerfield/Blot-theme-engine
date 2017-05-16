module.exports = {
  label: 'Share partial template with multiple templates.',
  folder: {'index.html': '{{> head.html}}-A', 'page.html': '{{> head.html}}-B', 'head.html': 'HEAD', },
  compare: 'templates',
  expected: {
    "/head.html":{
      "tree":[{"tag":"_t", "text": new String("HEAD")}],
      "locals":{},
      "retrieve":{}
    },
    "/index.html":{
      // because the partial is replaced, there are two adjacent text nodes
      "tree":[{"tag":"_t","text": new String("HEAD")}, {"tag":"_t","text": new String("-A")}],
      "locals":{},
      "retrieve":{}
    },
    "/page.html":{
      // because the partial is replaced, there are two adjacent text nodes
      "tree":[{"tag":"_t","text": new String("HEAD")}, {"tag":"_t","text": new String("-B")}],
      "locals":{},
      "retrieve":{}
    }
  }
};