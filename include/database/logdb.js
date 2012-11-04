var dbconfig = require('../../config/db/dbconfig.js');

var mongoose = require('mongoose');
var db = mongoose.createConnection( dbconfig.getdbServer, dbconfig.getDatabase ); 			/*Need to be made a variable later*/

var schema = mongoose.Schema({ nick: 'string' , chat: 'string' , Details: 'string' , time: Date });	/*Schema declaration*/
var Chat = db.model('Chat', schema);									/*Link schema to db collection, here collection name is chat*/

//console.log("hey") ; /*Just for checking */

exports.save = function (nick, chat, details) {
	var chat = new Chat({ nick: nick , chat: chat , Details: details , time : new Date() });
	chat.save(function (err) {
	if (err) 
	{
  		console.log("You should never see this message and if you do see this message then you need to kill some bugs") ;
	}
	else
	{
		console.log("Data successfully added to the database") ;
	}
	});
} ;


