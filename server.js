const https = require('https');
//const open = require('open');
var requestHandler = require('./requestHandler.js');


var port  = process.env.PORT || process.argv[2] || 8080;


https.createServer(function(req, res){
    requestHandler.formRequest(req, res);
    requestHandler.home(req, res);

}).listen(port);

console.log("Started Server on port http://mysite:" + port);
// open('http://mysite:' +port, 'chrome');
// process.on('SIGINT', function() {
//     console.log("Caught interrupt signal CTRl^C");
//     console.log('\nShutting down the Web server');
//     setTimeout(function () {
//         process.exit(0);
//     },3000);
// });
