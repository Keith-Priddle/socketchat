const MongoClient = require('mongodb').MongoClient;
const Joi = require('joi');
const express = require('express');
var app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
	  origin: "http://35.176.134.74:3000" ,
	methods: ["GET","POST"]
  }
});
const port = process.env.Port || 3000;
//const socket = io('http://172.31.22.58:3000');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
	console.log('Server listening on port %d', port);
});



let url = 'mongodb://127.0.0.1/socketchat';

/* 
 * connect to mongodb
 */
MongoClient.connect(url, function (err, db) {
	if (err) throw err;
	console.log('Connected to MongoDb');

	//Set db constants
	const socketchat = db.db('socketchat');
	const users = socketchat.collection('users');
	const messages = socketchat.collection('messages');

	/*
	 * connect to socket.io
	 */
	io.on('connection', function (socket) {

		console.log('Connected to socket.io ID: ' + socket.id);
	

		socket.on("username", function(username){
			console.log(username);
			

			users.find().toArray(function (err, res) {
				if(err) throw err;
				socket.emit('users', res);
			});

			messages.find().toArray(function (err, res){
			        if (err) throw err;
				socket.emit('messages', res);
			});	

			users.insertOne({socketID: socket.id, username: username});
			socket.broadcast.emit('logon', {
				socketID: socket.id,
				username: username
			});


		})

		/*
		 * Handle log off
		 */
		 socket.on('disconnect', function () {
			 console.log('user ' + socket.id + ' disconnected!');
 
			 users.deleteOne({socketID: socket.id}, function () {
				 socket.broadcast.emit('logoff', socket.id);
			 });
		 });

		/*
		 * Handle chat input
		 */
		socket.on('input', function (data) {

			if (data.publicChat){


			messages.insertOne({username: data.username, message: data.message, date: data.date });

			}
		io.emit('output', data);

		});

		/*
		 * Handle second user trigger
		 */
		socket.on('secondUserTrigger', function (data){
		
		  socket.to(data.secondUserID).emit('secondUserChatWindow', data);

		});


	});
	

});


app.get('/', function(req,rep){
	rep.render('chat');
});


app.get('/demos', function(req, rep){
		rep.render('chat');
			
});

app.get('/api/users',(req, rep)=>{
	
	rep.send('Requesting user list from api');
});

	
