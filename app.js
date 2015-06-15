var express = require('express'),
    app = express(), 
    methodOverride = require('method-override'), 
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    db = require("./models"),
    request = require('request');

app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//redirect - remember to insert another route as your parameter 
app.get('/', function(req, res) {
  res.redirect('/users');
});

//render the INDEX page 
app.get('/users', function(req, res) {
  db.User.find({}, function(err, users){
  	res.render('users/index', {users: users});
  });
});

//show form for NEW user
app.get('/users/new', function(req, res){
	res.render('users/new');
});

//CREATE user - with user data and redirect to '/'
app.post('/users',function(req, res){
	db.User.create(req.body.user, function(err, userData){
		if(err) {
			res.render('users/404');
		}
		else {
			res.redirect('/users') 
		}
	}); 
});

//request to iTunes
app.get('/users/startGame', function(req, res){
	var songIds = ["995535015", "966411602", "823593456", "956689796", "943946671",
	"982388023", "907242704", "201281527", "656801339", "910038357",
	"250038575", "878000348",  "794095205",  "1645339",  "400835962",
	"325618", "191924084",  "376116617",  "169003415",  "51958108",
	"76532142", "192688540", "684811768", "344799464", "217633921",
	"192811017", "258404365", "71068886", "640047583", "517438248" ];
	var songId = songIds[Math.floor(Math.random()*songIds.length)];
  console.log(songId); 
  var urlWithSongId = "https://itunes.apple.com/us/lookup?id=" + songId;
  request.get(urlWithSongId, function(err, response, itunesData){
  	if (err) {
  		res.render('users/404');
  	}
  	else if (!err && response.statusCode === 200) {
  		itunesDataParsed = JSON.parse(itunesData); 
  		var dataObj = itunesDataParsed.results[0];
  		//var previewSong = dataObj.previewUrl; 
  		console.log(itunesDataParsed); 
  		res.render('users/startGame', {dataObj: dataObj}); 
  	}
  });
	

});

//SHOW 
app.get('/users/:id', function(req, res){
	db.User.findById(req.params.id, function(err, user){
		res.render("users/show", {user:user});
	});
});

//EDIT 
app.get('/users/:id/edit', function(req, res){
	var user = db.User.findById(req.params.id, function(err, user) {
		console.log(user.id);
		if(err) {
			res.render('users/404');
		}
			res.render('users/edit', {user:user}) 
	});
});

//UPDATE
app.put('/users/:id', function(req,res){
	db.User.findByIdAndUpdate(req.params.id, req.body.user, function(err, user){
		// for(var prop in req.body.user){
		// 	user.prop = req.body.user[prop]; 
		// }
		// user.save(function(err,user){
		// 	if (err) throw err; 
			res.redirect('/users'); 
		// });
	});
});

// DESTROY
app.delete('/users/:id', function(req, res){
	db.User.findByIdAndRemove(req.params.id, function(err, user){
		if(err) {
			res.render('users/404');
		}
			res.redirect('/users') 
	});
});



// CATCH ALL
app.get('*', function(req,res){
  res.render('users/404');
});

app.listen(3000, function() {
  console.log("You started the serever on port 3000, well done!");
});
