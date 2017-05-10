The prototype for Blot's new theme rendering engine.

A *theme* refers to a directory of *template* files.

It takes a directory of files:
  - creates 'templates' from certain files
  - store them as a 'theme'
  - provides express middleware for routing requests
  - provides express middleware rendering the templates.

Lets say our theme directory contains a single file, *home.html*:

```html
<html>
<body>
<h1>{{title}}</h1>
</body>
</html>
```

And then we can use this theme on our express app:

```javascript

var express = require('express');
var Theme = require('blot-theme-engine');

// This is where the magic happens
// This dictionary tells the theme engine
// how to find the value for each local variable
// used in template
var locals = {
    title: function(req, res, next){
      res.locals.title = 'Hello World';
      next();
    }
  }

var theme = new Theme({
  path: '/path/to/theme-directory',
  locals: locals
});

// parse and store the theme
// this happens asynchronously
theme.load(function(err){...});

// use the theme with express
app.use(theme.middleware);
app.listen(...);
```

Now when we request ```/home.html``` we should see:


```
<html><body>Hello World!</body></html>
```
