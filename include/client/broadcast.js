var logdb = require('../database/logdb.js') ;
var modChat = require ('../../chat.js') ;

exports.sendData = function (data, connection, connAttributes, connections)
{ 	data = String(data).replace(/(\r\n|\n|\r)/gm,"");			/*remove unwanted newline character multiple times and multiple location*/
	var index = connAttributes.indexOf(connection.remotePort+connection.remoteAddress) ;
	logdb.save(connAttributes[index+1], data, connection.remoteAddress+connection.remoteAddress) ;	
	if (data == "quit")   /*Inform the other users about who left the conversation*/
 	{
		connection.write("Attempting to close the connection\n") ;	
		modChat.endConnection(connection);
	}
	else if (data == "listall")   /*list all logged in users*/
	{
			for (var i=1; i < connAttributes.length ; i=i+3)  	/*need to be abstracted later*/
			{
				connection.write(connAttributes[i] + "\n") ;
			}
	}
	else
	{
	for (var i=0; i < connections.length ; i++)  					/*need to be abstracted later*/
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
	}
};
