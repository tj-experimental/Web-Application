var router = require("./router.js");
//Problem We need a simple way to look at a users badge and javscript point
// from a web browser
//Solution use nodejs to perform the profile lookups and serve our template
// via http

// Create a Web Server
var http = require('http');

var localAddress = '127.0.0.1';
var port = 3000;

http.createServer( function(request, response){
  router.home(request, response);
  router.user(request, response);
}).listen(port);
console.log('Server is running at workspace url:'+ port);
