import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import socketIo from 'socket.io';
// import socketioJwt from 'socketio-jwt';
import api from './routes/api';
import { initDb } from './initDb';
// import socket from './sockets/socketIo';
import moment from 'moment';

const app = express();




initDb();

const server = http.createServer(app);
const io = socketIo.listen(server);
let users = [];

moment().locale('fr');

// io.use(socketioJwt.authorize({
// 	secret: 'mybadasssecretkey',
// 	handshake: true
// }));

io.on('connection', socket => {
	const socketID = socket.id;
	console.log("test  " + JSON.stringify(socketID));
	// socket.emit('chat-history', )
	socket.on('send-chat-message', message => {
		socket.broadcast.emit('chat-message', message)
	})
	socket.on('disconnect', () => {
		socket.broadcast.emit('user-disconnected', users[socket.id])
		delete users[socket.id]
	})
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api', api);

app.use(function (err, req, res, next) {
	res.status(422).send({ error: err.message });
});

app.set('port', (process.env.PORT || '5000'));

server.listen(app.get('port'), () => {
	console.log('Server started on port ' + app.get('port'))
});

module.exports = app;
