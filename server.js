const http = require('http');
var requestHandler = require('./requestHandler.js');


var port  = process.argv[2] || 8080;


http.createServer(function(req, res){
    requestHandler.formRequest(req, res);
    requestHandler.home(req, res);

}).listen(port);

console.log("Started Server on port http://127.0.0.1:" +port);

