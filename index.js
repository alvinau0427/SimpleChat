const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const records = require('./records.js');
const port = process.env.PORT || 3000;

let onlineCount = 0;

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
	console.log('System Message: server connected');

	onlineCount++;
	io.emit('online', onlineCount);
	socket.emit('maxRecord', records.getMax());
	records.get((msgs) => {
		socket.emit("chatRecord", msgs);
	});

	socket.on('send', (msg) => {
		if (Object.keys(msg).length < 2) {
			return;
		}
		records.push(msg);
	});

	socket.on('disconnect', () => {
		console.log('System Message: server disconnected');
		onlineCount = (onlineCount < 0) ? 0 : onlineCount -= 1;
		io.emit('online', onlineCount);
	});
});

records.on('new_message', (msg) => {
	io.emit('msg', msg);
});

server.listen(port, () => {
	console.log('System Message: server started on http://localhost:3000');
});
