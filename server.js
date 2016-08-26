const http = require('http');
var requestHandler = require('./requestHandler.js');


var port  = process.argv[2] || 8080;


http.createServer(function(req, res){
    requestHandler.formRequest(req, res);
    requestHandler.home(req, res);

}).listen(port);

console.log("Started Server on port http://127.0.0.1:" +port);

process.on('SIGINT', function() {
    console.log("Caught interrupt signal CTRl^C");
    console.log('\nShutting down the Web server')
    setTimeout(function () {
        process.exit(0);
    },3000);
});
