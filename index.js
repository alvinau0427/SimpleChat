const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const records = require('./records.js');
const port = process.env.PORT || 80;

// Online users
let onlineCount = 0;

app.use(express.static(path.join(__dirname, 'views')))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

// When a connection event occurs
io.on('connection', (socket) => {
	console.log('System Message: server connected');

	onlineCount++;
	io.emit('online', onlineCount);
	// Add the maximum record to let the front-end webpage know how many data to place
	socket.emit('maxRecord', records.getMax());
	// Add the chat record
	socket.emit('chatRecord', records.get());

	socket.on('send', (msg) => {
		// If the content key value is less than two, it means that the message is incomplete
		if (Object.keys(msg).length < 2) {
			return;
		}
		records.push(msg);
	});

	// When an offline event occurs
	socket.on('disconnect', () => {
		console.log('System Message: server disconnected');
		onlineCount = (onlineCount < 0) ? 0 : onlineCount -= 1;
		io.emit('online', onlineCount);
	});
});

records.on('new_message', (msg) => {
	// Broadcast message to chatroom
	io.emit('msg', msg);
});

server.listen(80, () => {
	console.log('System Message: server started on http://localhost:80');
});
