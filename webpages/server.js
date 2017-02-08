
var http = require('http');
var url = require('url');
var server = http.createServer(
    function (request, response) {
        var parsedUrl = url.parse(request.url, true);
		    if (parsedUrl.pathname == '/index') {
            response.setHeader("Content-Type", "text/plain");
            response.end('Hello!\n');
        } else {
            response.statusCode = 404;
            response.end('Not found!\n');
        }
    }
);
server.listen(8080);
