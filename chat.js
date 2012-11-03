/*Required for creating server*/
var net = require('net'); 
/*Server parameter file*/
var serverConfig = require('./config/server/server.js');
/*create server*/
var server = net.createServer(newConnection) ;
/*Function to be called when someone new connects to the server*/
function newConnection(connection)
{
	connection.write("Welcome to the IRC server powered by Node.js !");
	/*broadcast the message*/
}

/*bind the server to listen to a particular port that is set in the config file*/
server.listen(serverConfig.getServerPort) ;


