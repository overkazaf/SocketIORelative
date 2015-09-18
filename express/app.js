var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.listen(80);

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	socket.emit('note', {'hello' : 'world'});

	socket.on('otherEvent', function (data) {
		console.log(data);
	});
});