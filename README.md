# Blot's theme engine

This is a prototype for an engine to render Blot sites. A *theme* is a collection of *templates* used to render a site. A *template* is used to render the response for requests to a set of URLs which match a *route*. A *template* can contain variables, a.k.a. *locals*, and sub-templates, a.k.a. *partials*.

**Why does this exist?**

For efficient rendering of mustache templates. It avoids fetching unused data for a given route and given a dictionary of methods to retrieve the value of locals will build the view for you automatically.

**How does it work?**

It creates *templates* from files inside a *theme directory*, stores them as a *theme*, then exposes Express middleware for routing requests and rendering the *templates*.

**Example**

Create a folder (a.k.a *theme directory*) and put ```home.html``` inside:

```html
<html>
<body>
<h1>{{title}}</h1>
</body>
</html>
```

We can then use this theme in ```app.js```:

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

When you point your web browser to ```/home.html``` you should see:

```html
<html>
<body>
<h1>Hello World!</h1>
</body>
</html>
```