**Glossary**

A *theme* is a collection of *templates* used to render a site. A *template* is used to render all the URLS which match a *route*. A **template** can contain variables (*locals*) and sub-templates (*partials*).

**Why does this exist?**

For efficient rendering of templates whose view you cannot compose ahead-of-time. It prevents fetching unused data for a given route. Inspired by express' ```req.param(...``` function. It might help to think about this engine as a ```req.local(...``` function.

**How does it work?**

It takes a directory of files, creates *templates* from files inside, stores them as a *theme*, then exposes Express middleware for routing requests and rendering the templates.

**Example**

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
var app = express();
var Theme = require('blot-theme-engine');

// This dictionary tells the theme engine
// how to find the value for each variable
var locals = {

  // This function is only called for routes
  // whose template contains "{{title}}"
  title: function(token, req, res, callback){

    // We could do lots of stuff here
    // e.g. make a database query...
    callback(null, 'Hello World');
  }
};

var theme = new Theme({
  path: '/path/to/theme-directory',
  locals: locals
});

// parse and store the theme
// this happens asynchronously
theme.load(function(err){...});

// route requests to theme
app.use(theme.middleware);

// open the server to requests
app.listen(...);
```

Now when we point our web browser to ```/home.html``` we should see:

```html
<html>
<body>
<h1>Hello World!</h1>
</body>
</html>
```