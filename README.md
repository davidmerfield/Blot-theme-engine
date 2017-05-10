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
var Express = require('express');
var Theme = require('theme-engine');
var theme, app;
var locals = {

  // This function is only invoked to render templates
  // which contain '{{title}}', like our home.html.
  // It's asychronous so we could make a db query.
  title: function(token, req, res, callback){
    callback(null, 'Hello World');
  }
};

// Initialize the theme
theme = new Theme({path: '/theme', locals: locals});

// Compile and store the theme in /theme
theme.load(function(err){...});

// Initialize the app
app = Express();

// Route requests to theme
app.use(theme.middleware);

// Open the app to requests
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