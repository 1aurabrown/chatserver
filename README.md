chatserver
==========

Chat server implemeneted using Node.js. To be used over telnet.

Prerequisites :
1. MongoDB
2. Node.js
3. Mongoose module
4. net Module 
5. Make sure the port you are using for the chat server is free and not used by any other process.

Modules used are :
1. Mongoose
2. Net

Config :

1. Chat server setting need to be done here :		chatserver/config/server/server.js
	Parameters that can be set from this config file are :	
		1. Server Port
		2. Server Address
		3. Client timeout period (microsecond)

2. Database server setting that need to be done here :  chatserver/config/db/dbconfig.js
	Note : Currently logged in user should have access to the database being used. No database username password is allowed.
	1. Server address.
	2. Database Name



User Documentation :

1. To start the server type after going indside the chatservr folder that you checkout :
	node chat.js 
	OR
	nodemon chat.js (if you are looking to do some development)     

2. Use following command to connect : 
		telnet localhost 5000 ;  (if running and chat server on localhost)

3. Type quit without any space to quit the chat.
4. Type listall without any spaces to list all users currently logged in.

