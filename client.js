$(function () {

	//connect to socket.io
	console.log('working in client 1');
	//var socket = io.connect('http://35.176.134.74:3000');
        console.log('Working in client 2');	

	/* 
	 * enter chat and load users
	 */
	$("a#enterChat").click(function(e) {

		e.preventDefault();
		let username = $("#username").val();

		localStorage.setItem("username",username);

		if (username != ""){
			socket.emit("username", username);
		} else {
			alert("You must enter a username");	
		}
	});




});		
