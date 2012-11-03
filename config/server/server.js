var serverPort = 5000 ; /*don't make variable global not recommended*/

var serverAdd = "localhost" ;

exports.getServerPort = function() /*variable not global, need a function call similar to get/set method in java*/
{
	return serverPort , serverAdd;
} ;



