var server = require("./server");
var client = require("./client");

const express = require('express');
const path = require('path');


var app = express();
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));




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
	
	})
	console.log('Working 1');

	console.log('Working 2');

})

	//var app = express();
	//app.set('view engine', 'ejs');
	//app.use(express.static(path.join(__dirname, 'public')));
	//app.get('/', function(req, rep){
	//	rep.render('index');
	
	//})

	//app.listen(3000, function(){
	//	console.log('server is live on 4000');
	//})
//})
