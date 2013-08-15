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

var users = [];

//set up event listeners
io.sockets.on('connection', function(socket) {
	socket.emit('message', { name: 'Server', message: 'Welcome to the chat!' });
  socket.emit('populate_users', { usrs: users });

	socket.on('send', function(data) {
		io.sockets.emit('message', data);
	});

  socket.on('add_name', function(data) {
    users.push(data.name);
    io.sockets.emit('add_name', { name: data.name });
  });
});
