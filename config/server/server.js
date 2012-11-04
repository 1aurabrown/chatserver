var serverPort = 5000 ; 		/*Don't make variable global not recommended*/
var serverAdd = 'localhost' ; 		/*Name of the server address(if more then 1 IP), where the chat process should run itself to*/
var timeOut = 40000 ;			/*Set timeout of each client as 400 second of inactivity*/

exports.getServerPort = function() 	/*variable not global, need a function call similar to get/set method in java*/
{
	return serverPort ;
} ;

exports.getServerAdd = function()	/*Return name of the server*/
{
	return serverAdd ;
} ;
	
exports.getTimeOut = function()		/*Return the timeout*/
{
	return timeOut ;
} ;



