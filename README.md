The prototype for Blot's new theme rendering engine.

A *theme* refers to a directory of *template* files.

It takes a directory of files:
  - creates 'templates' from certain files
  - store them as a 'theme'
  - provides express middleware for routing requests
  - provides express middleware rendering the templates.

Lets say our theme directory contains a single file, *home.html*:

```
<html><body>{{title}}!</body></html>
```

And then we can use this theme on our express app:

```javascript

var express = require('express');
var Theme = require('blot-theme-engine');

var theme = new Theme({
  path: '/path/to/theme-directory',
  locals: {
    title: function(req, res){
      res.locals.title = 'Hello World'
    }
  }
});

// parse and store the theme
theme.load();

// use the theme with express
app.use(theme.middleware);
app.listen(...);
```

Now when we request /index.html we should see:


```
<html><body>Hello World!</body></html>
```
