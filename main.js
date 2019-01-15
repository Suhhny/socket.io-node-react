import express from 'express';
import path from 'path';
import socketIO from 'socket.io';

const app = express();

app.use('/', express.static(__dirname + '/../public'));

app.all('*', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname + '/../public/index.html'));
});

const server = app.listen(3000);

const io = socketIO(server);

io.on('connection', (server) => {
	console.log('user connected');

	server.on('disconnect', () => {
		console.log('user disconnected');
	});

	server.on('SEND_MESSAGE', (data) => {
		io.emit('RECIEVED_MESSAGE', data);
	});
});

