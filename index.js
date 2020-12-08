const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

// Online users
let onlineCount = 0;

app.use(express.static(path.join(__dirname, 'views')))

app.get('/', (req, res) => {
	// res.send('Hello, World!');
	res.sendFile(__dirname + '/views/index.html');
});

// When a connection event occurs
io.on('connection', (socket) => {
	console.log('System Message: server connected');

	onlineCount++;
	io.emit('online', onlineCount);

	socket.on('send', (msg) => {
		// console.log(msg)
		// If the content key value is less than two, it means that the message is incomplete
		if (Object.keys(msg).length < 2) {
			return;
		}
		io.emit('msg', msg);
    });

	// When an offline event occurs
	socket.on('disconnect', () => {
		console.log('System Message: server disconnected');
		onlineCount = (onlineCount < 0) ? 0 : onlineCount -= 1;
		io.emit('online', onlineCount);
	});
});

server.listen(80, () => {
	console.log('System Message: server started on http://localhost:80');
});
