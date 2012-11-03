var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'test'); /*need to be made a variable later*/

var schema = mongoose.Schema({ nick: 'string' , chat: 'string' , Details: 'string' , time: Date });
var Chat = db.model('Chat', schema);


//console.log("hey") ; /*Just for checking */

exports.save = function (nick, chat, details) {
var chat = new Chat({ nick: nick , chat: chat , Details: details , time : new Date() });
chat.save(function (err) {
  if (err) 
{
  	console.log("You should never see this message") ;
}
else
{
	console.log("Data successfully added to the database") ;
}
});
} ;


