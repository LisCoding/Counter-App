//*****1. require express********
// Load the express module that we install using npm
var express = require("express");

// invoke var express and store the resulting application in var app
var app = express();

//******SESSION*******
// new code:
var session = require('express-session');
// original code:
var app = express();
// more new code:
app.use(session({secret: 'lovebunnies'}));  // string for encryption

// This sets the location where express will look for the ejs views: ejs stands for embebedded JS
app.set('views', __dirname + '/views');
//we need to install ejs
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

//**** 2. create routes ********
app.get('/', function(request, response) {
  if(!request.session.counter){
    request.session.counter = 1
  } else {
    request.session.counter++
  }

  // request.session.counter ++
  response.render('index', {count: request.session.counter})
  console.log("its working");
});
//Route to add 2 to counter
app.post('/add', function(request, response) {
  request.session.counter += 1
  response.redirect('/')
  console.log("its adding");
});

//Route to reset to counter
app.post('/reset', function(request, response) {
  request.session.counter = 0
  response.redirect('/')
  console.log("its reseting");
});

//******3 Call the listen function
// Tell the express app to listen on port 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
})
