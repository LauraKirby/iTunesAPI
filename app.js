var express = require('express'),
    app = express(), 
    methodOverride = require('method-override'), 
    bodyParser = require('body-parser'),
    morgan = require('morgan');
    db = require("./models");

app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));


//redirect - remember to insert another route as your parameter 
app.get('/', function(req, res) {
  res.redirect('/users');
});

//render the index page 
app.get('/users', function(req, res) {
  res.render('users/index');
});

//show form for new user
app.get('/users/new', function(req, res){
	res.render('users/new');
});

//create user - with user data and redirect to '/'
app.post('/users',function(req, res){
	var user = new db.User(req.body.user);
	res.redirect('/')
})


app.listen(3000, function() {
  console.log("You started the serever on port 3000, well done!");
});
