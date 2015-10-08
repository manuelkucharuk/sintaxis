var http = require("http");
var url = require("url"); 
var fs = require("fs");

http.createServer(function (request, response) { 
		fs.readFile("test.txt", 'utf-8', function (error, data){
			response.writeHead(200, {'Content-Type': 'text/plain'}); 
			data = parseInt(data) + 1;
			fs.writeFile('test.txt', data);
			response.end('This page was refreshed');
		}); 
}).listen(3000);