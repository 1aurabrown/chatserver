var connAttributes = [] ;
var connections = [] ;


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
	connection.write("Someone from " + connection.remoteAddress + " entered the room \n") ;
	connection.write("Nick	:  	") ;

	/*Array to store the nick of the person*/
	connAttributes.push (connection.remotePort+connection.remoteAddress);    /*Index x is id*/
	connAttributes.push ("");	/*Place where Nick will be stored*/		 /*index x + 1 is nick*/
	connAttributes.push("n") ;	/*No Nick diclared as of now*/			 /*index x + 2 is wheather nick for index x id is set or not*/

	connections.push(connection) ;
	remoteAddress=connection.remoteAddress ;
	connection.on('data' , function (data) { sendData (data,connection) ; } ) ;
	connection.on('end' , function() { endConnection(connection);  });
	/*connection.end("Bye Bye, have a nice day !!\n") ;*/
};

function sendData (data, connection)
{ 	
	for (var i=0; i < connections.length ; i++)  /*need to be abstracted later*/
	{	var index = connAttributes.indexOf(connection.remotePort+connection.remoteAddress) ;
		if (connections[i] != connection && connAttributes[index+2] == "y")	/*If my identity is known then let everyone see my chat*/	
	
		{
			connections[i].write( connAttributes[index+1] + " from " + connections[i].remotePort + "@" + connections[i].remoteAddress + " : " +  data + " \n") ;		
		}
		if (connections[i] == connection && connAttributes[index+2] == "n")	/*if my identity is not known then set my first input as my nick even if its empty*/
		{
			connAttributes[index+1] = data ;
			connAttributes[index+2] = "y" ;		
			/*connection.write("set") ;*/
			/* Let evertone knows who entered -- Need to be abstracted later*/
			for (var i=0; i < connections.length ; i++)
			{
				connections[i].write( connAttributes[index+1] + " from " + connections[i].remotePort + "@" + connections[i].remoteAddress + " : " +  "just now entered the IRC chat server" + " \n") ;
			}
		}
					
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


