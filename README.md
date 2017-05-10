```javascript
var app, theme, locals;

// Create the folder containing our templates
fs.mkdirSync('my_theme');

// Create a template in the theme's folder
fs.writeFileSync('my_theme/home.html', '{{title}}');

// Load the theme from disk
theme = new Theme('my_theme');

// Tell the theme how to find the value for {{title}}. 
theme.local('title', function(req, res, callback){
  return callback(null, 'Hello world!');
});

// Initialize the app
app = Express();

// Route requests to theme
app.use(theme);

// Open the app to requests
// When you point your web browser to /home.html you should see "Hello world!".
app.listen(...);
```

# Blot's theme engine

This is a half-working prototype for an engine to render Blot sites. A *theme* is a collection of *templates* used to render a site. A *template* is used to render the response for requests to a set of URLs which match a *route*. A *template* can contain variables, a.k.a. *locals*, and sub-templates, a.k.a. *partials*.

**Why does this exist?**

For efficient rendering of mustache templates. When given a template and a dictionary of methods to retrieve the value of locals, it will build the view and render the template for you automatically.

**How does it work?**

It creates *templates* from files inside a *theme directory*, stores them as a *theme*, then exposes Express middleware for routing requests and rendering the *templates*.

