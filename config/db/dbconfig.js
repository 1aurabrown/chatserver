var dbServer = 'localhost' ;		/*Name of the database server*/
var database = 'test' ;			/*Name of the database*/

exports.getdbServer = function()	/*Return the name of the database server*/
{
	return dbServer;
} ;

exports.getDatabase = function() 	/*Return the name of the database*/
{
	return database;
}
