$(document).ready(function() {
	var socket = io.connect('/');
	var field = $('.field');
	var sendBtn = $('.send');
	var content = $('.content');
  var users = $('.user_list');
  var name;

  while(!name) {
    name = prompt('Please enter a username', 'Name');
  }

  //broadcast user name
  socket.emit('add_name', { name: name } );

  //add existing users names
  socket.on('populate_users', function(data) {
    for(var i = 0; i < data.usrs.length; i++) {
      users.append(data.usrs[i] + '<br>');
    }
  });

  //add new user names
  socket.on('add_name', function(data) {
    users.append(data.name + '<br>');
  });

	//print received messages
	socket.on('message', function(data) {
		if(data.message) {
			content.append(data.name + ' : ' + data.message + '<br>');
		}
		else {
			console.log('error: ', data);
		}
	});

	//send messages
	sendBtn.click(function() {
		var text = field.val();
		socket.emit('send', { name: name, message: text });
		field.val('');
	});
});
