var client = require('./client');
var forEach = require('helper').forEach.parallel;

module.exports = function (path, theme, callback) {


  // console.log();
  // console.log('=============================');
  // console.log('ROUTES:');
  // console.log(routes)
  // console.log();
  // console.log('TEMPLATES');
  // console.log(templates);

  // console.log('retrieve:');

  // for (var i in templates)
  //   console.log(templates[i].retrieve);

  // var routes = [
  //   // '/': 'index.html'
  //   // '/*': 'index.html'
  //   // '/search'
  //   // etc..
  // ];

  // var keys = [];
  // var routes = [];

  // forEach(templates,function(n, t, next){

  //   // keys.push('template:' + n);
  //   // keys.push(JSON.stringify(t));

  //   t.routes.forEach(function(r){
  //     keys.push('template:' + r);
  //     keys.push(JSON.stringify(t));
  //     routes.push(r);
  //   });

  //   next();

  // }, function(){

  //   // console.log('KEYS ARE', keys);
  //   // console.log('ROUTES ARE', routes);

  //   // need to delete templates
  //   var multi = client.multi();
  //   multi.mset(keys);
  //   multi.del('routes');
  //   multi.rpush('routes', routes);
  //   multi.exec(callback);
  // });

  callback();
};

// module.exports = {
//   routes: require('./routes'),
//   template: require('./template')
// };