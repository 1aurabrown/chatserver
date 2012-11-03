var connAttributes = [] ;
var connections = [] ;
var connAttribute = [] ;

/*Required for creating server*/
var net = require('net'); 
/*Server parameter file*/
var serverConfig = require('./config/server/server.js');
/*create server*/
var server = net.createServer(newConnection) ;
/*Function to be called when someone new connects to the server*/
function newConnection(connection)
{
	connection.write("Welcome to the IRC server powered by Node.js !\n");
	/*broadcast the message*/
	connection.write("Someone from " + connection.remoteAddress + " entered the room") ;
	//connection.write("Nick	:  	\n") ;

	/*Array to store the nick of the person*/
	connAttribute = [] ;
	connAttribute.push (connections[i].remotePort+connections[i].remoteAddress);
	connAttribute.push ("");	/*Place where Nick will be stored*/
	connAttribute.push("n") ;	/*No Nick diclared as of now*/

	/*keep a track of all the connection attributes*/
	connAttributes.push(connAttribute) ;

	connections.push(connection) ;
	remoteAddress=connection.remoteAddress ;
	connection.on('data' , function (data) { sendData (data,connection) ; } ) ;
	connection.on('end' , function() { endConnection(connection);  });
	/*connection.end("Bye Bye, have a nice day !!\n") ;*/
};

function sendData (data, connection)
{ 	
	

	for (var i=0; i < connections.length ; i++)
	{
		if (connections[i] != connection)		
	
		{
			connections[i].write( connections[i].remotePort + "@" + connections[i].remoteAddress + " : " +  data + " \n") ;		
		}
		/*var index = connAttributes.indexOf(connAttribute[]) ;
		connAttributes[index][1] = data ;
		connAttributes[index][2] = "y" ;				
		connections[i].write(connAttributes[0][1]) ;*/
	}
};

function endConnection(connection) 
{ 
	connection.end("Bye Bye, have a nice day !!\n") ; 
	var index = connections.indexOf(connection) ;		/*delete function ot working need to reverify. */
	connections.splice(index,1) ;			
}

	

/*bind the server to listen to a particular port that is set in the config file*/
server.listen(serverConfig.getServerPort()) ;


