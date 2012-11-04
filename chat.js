var connAttributes = [] ; /*Array to store connection attributes*/
var connections = [] ; /*Array to store all connection */

/*Required for creating server*/
var net = require('net'); 

/*Server parameter file*/
var serverConfig = require('./config/server/server.js');

/*Program that will be responsbile for broadcasting the message to all the logged in users*/
var broadcast = require('./include/client/broadcast.js');

/*create server*/
var server = net.createServer(newConnection) ;

/*Function to be called when someone new connects to the server*/
function newConnection(connection)
{
	/*Inform the user, that he is currently logged in*/	
	connection.write("Welcome to the IRC server powered by Node.js !\n");
	
	/*Set the connection timeout*/	
	connection.setTimeout(serverConfig.getTimeOut()) ;
	
	/*broadcast the message*/
	connection.write("Someone from " + connection.remoteAddress + " entered the room \n") ;
	connection.write("Nick	:  	") ;

	/*Array to store the nick of the person*/
	connAttributes.push (connection.remotePort+connection.remoteAddress);    /*Index x is id*/
	connAttributes.push ("");	/*Place where Nick will be stored, index x + 1 is nick*/
	connAttributes.push("n") ;	/*No Nick diclared as of now, index x + 2 is wheather nick for index x id is set or not*/
	connections.push(connection) ;
	remoteAddress=connection.remoteAddress ;

	/*Send the message to all the users*/
	connection.on('data' , function (data) { broadcast.sendData (data, connection, connAttributes, connections) ; } ) ;
	
	/*If timeout then call the endConnection*/	
	connection.on('timeout' , function() { endConnection(connection);  });

	connection.on('end' , function() { endConnection(connection);  });
	/*connection.end("Bye Bye, have a nice day !!\n") ;*/
};



function endConnection(connection) 
{ 
	var index = connections.indexOf(connection) ;		/*delete function NOT working need to reverify. */
	connections.splice(index,1) ;				/*Remove the connection from the array if closed*/
	connection.end("Bye Bye, have a nice day !!\n") ; 
	broadcast.sendData ("User left the conversation", connection, connAttributes, connections)  ;	/*Let everyone know who left the conversation*/
}

/*bind the server to listen to a particular port that is set in the config file*/
server.listen(serverConfig.getServerPort(), serverConfig.getServerAdd()) ;


