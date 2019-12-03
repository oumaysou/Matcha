import express from 'express';
// import session from 'express-session';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import socketIo from 'socket.io';
// import socketioJwt from 'socketio-jwt';
import api from './routes/api';
import { initDb } from './initDb';
import moment from 'moment';
// import cors from 'cors';
// import * as util from 'util' // has no default export
// import { inspect } from 'util' // or directly
// or 
// var util = require('util')

const app = express();

initDb();

const server = http.createServer(app);
const io = socketIo.listen(server);
io.set('heartbeat timeout', 60000);
// { origins: 'localhost:* http://localhost:* http://www.localhost:*' }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api', api);
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

const users = [];


moment().locale('fr');

io.on('connection', socket => {
	socket.on('send-chat-message', ((userTo, message) => {
		socket.broadcast.emit('chat-message', message)
	}))
	socket.on('disconnect', () => {
		socket.disconnect();
		delete users[socket.id]
	})
})



app.use(function (err, req, res, next) {
	res.status(422).send({ error: err.message });
});

app.set('port', (process.env.PORT || '5000'));

server.listen(app.get('port'), () => {
	console.log('Server started on port ' + app.get('port'))
});

module.exports = app;
