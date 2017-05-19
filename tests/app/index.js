var express = require('express');
var server = express();
var exec = require('child_process').exec;
var path = require('path');
var responseTime = require('./responseTime');
var fs = require('fs');
var THEME_DIR = path.resolve(__dirname + '/theme');
var BLOG_DIR = path.resolve(__dirname + '/blog');

console.log('Making sure redis is running!');
exec('redis-server --port 6666 --dir ~/Projects/theme/');
console.log('Remember to shut down redis when youre done!');


var dashboard = express();

dashboard.route('/')

  .get(function(req, res){
    res.send('HEY');
  })

  .post(function(req, res){
    res.redirect('/');
  });

var theme = require('../../lib');

console.log('Compiling theme from', THEME_DIR);
theme.update(THEME_DIR, function (err){

  if (err) console.log(err);

  server.use(function(req, res, next){

    if (req.host === 'dashboard.localhost') return dashboard(req, res, next);

    return next();
  });

  fs.watch(THEME_DIR, function(){

    theme.update(THEME_DIR, function(err){
      if (err) console.log(err);
      console.log('REBUILT THEME');
    });
  });

  // ideally nginx would find a hit here
  server.use(express.static(BLOG_DIR));

  server.use(responseTime);

  // check for drafts here...

  // check for robots.txt on preview domain

  // load blog here
  server.use(function(req, res, next){
    res.locals.theme = THEME_DIR;
    next();
  });

  server.use(theme.middleware({
    params: require('./params'),
    locals: require('./locals'),
    lookup: function(req, res){
      return res.locals.theme;
    }
  }));

  // look for redirects here

  // fall back to default view for robots.txt,
  // sitemap.xml, feed.rss

  // server.use(theme.error);

  server.use(function(req, res){
    res.send("No route found :(");
  });

  server.use(function(err, req, res, next){
    res.send(err);
  });

  server.listen(8989);
  console.log('Listening for requests at http://localhost:8989');
  console.log();
  console.log();
  console.log();
  console.log();
});
