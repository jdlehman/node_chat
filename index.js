//set up express
var express = require('express');
var app = express();
var port = 8080;
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

//render page
app.get('/', function(req, res) {
	res.render('chat');
});

var io = require('socket.io').listen(app.listen(port));

//set up event listeners
io.sockets.on('connection', function(socket) {
	socket.emit('message', {message: 'Welcome to the chat!'});
	socket.on('send', function(data) {
		io.sockets.emit('message', data);
	});
});
