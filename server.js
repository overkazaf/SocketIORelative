var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler(req, res) {
	fs.readFile(__dirname + '/index.html', function (err, data){
		if (err) {
			res.writeHead(500);
			return res.end('error loading index.html');
		}

		res.writeHead(200);
		res.end(data);
	})

}

io.on('connection', function (socket){
	socket.emit('news', {hello:'world'});	
	socket.on('chat', function (data){
		console.log('Client :' + data['msg']);

		socket.emit('randomMsg', {
			msg : genRndMsg()
		})
	});

});

function genRndMsg () {
	var 
		msgs = [
			'hello',
			'what\'s your name',
			'what\'s your title',
			'R U OK?'
		];

	return msgs[Math.floor(Math.random() * msgs.length)]
}

console.log('Server is listening at port 80');