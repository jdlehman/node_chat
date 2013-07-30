$(document).ready(function() {
	var socket = io.connect('/');
	var field = $('.field');
	var sendBtn = $('.send');
	var content = $('#content');
	
	//print received messages
	socket.on('message', function(data) {
		if(data.message) {
			content.append(data.message + '<br/>');
		}
		else {
			console.log('error:', data);
		}
	});

	//send messages
	sendBtn.click(function() {
		var text = field.val();
		socket.emit('send', { message: text });
		field.val('');
	});
});
