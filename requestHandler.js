const qs = require('querystring');
const path =  require('path');
const fs = require('fs');


//Print out error messages

function printError(error){

    console.error("Error: " +  error.message);
}



function formRequest(req, res){

    if (req.method === 'POST'){
        var body = '';
        req.on('data', function( data){
            body += data;

            if (body.length > 1e6){
                req.connection.destroy();
            }
        });
        req.on('end', function(){
            try{
                var POST = qs.parse(body);
                console.log(POST);
            }catch (error){
                printError(error);
            }
        });
        req.on('error', printError);
    }
}

function home(req, res) {
    var filePath = '.' + req.url;
    if (filePath == './'){
        filePath = './index.html';
    }

    var extension = path.extname(filePath).toLowerCase();
    var contentType = 'text/html';

    switch(extension){
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.map':
            contentType = 'application/json';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.html':
            contentType = 'text/html';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.woff2':
            contentType = 'application/font-woff2';
            break;
        case '.woff':
            contentType = 'application/x-font-woff';
            break;
        case '.ttf':
            contentType = 'application/x-font-truetype';
            break;
    }
   try {
       fs.readFile(filePath, function (error, content) {
           if (error) {
               if (error.code == 'ENOENT') {
                   printError({message:"location:" + error.path + " errorCode:" + error.errno});
                   fs.readFile('./error/404.html', function (error, content) {
                       if(error){
                           printError({message:"location:" + error.path + " errorCode:" + error.errno});
                           throw (error);
                       }else {
                           res.writeHead(200, {'Content-Type': contentType});
                           res.end(content, 'utf-8');
                       }
                   });
               } else {
                   printError({message:"location:" + error.path + " errorCode:" + error.errno});
                   res.writeHead(500);
                   res.write("Error: " + error.description + '..\n Path: ' + error.path);
                   res.end();
               }
           } else {
               res.writeHead(200, {'Content-Type': contentType});
               res.end(content, 'utf-8');
           }
       })
   }catch (error){
       printError(error);
   }

}

module.exports.home = home;
module.exports.formRequest = formRequest;
