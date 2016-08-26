const qs = require('querystring');
const path =  require('path');
const fs = require('fs');

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
            var POST = qs.parse(body);
            console.log(POST);
        });
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
            contentType = 'image/jpg';
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
        default:
            contentType = 'text/html';
    }

    fs.readFile(filePath, function(error, content){
        if(error){
            if(error.code == 'ENOENT'){
                console.log("Error reading File");
                fs.readFile('./error/404.html', function(error, content){
                    res.writeHead(200, {'Content-Type': contentType});
                    res.end(content, 'utf-8');
                });
            }
            else{
                res.writeHead(500);
                res.write('Sorry, the requested page is not available error code' + error.code + '..\n');
                res.end();
            }
        }
        else{
            res.writeHead(200, {'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    })

}

module.exports.home = home;
module.exports.formRequest = formRequest;
