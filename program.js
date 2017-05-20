/************************************ STEP 6

var mymodule = require("./test.js");

mymodule(process.argv[2], process.argv[3], function(err, data) {
	data.forEach(function(item) {
		console.log(item);
	});
}); 

********************************************/

/************************************ STEP 9

var http = require("http");

http.get(process.argv[2], function(res) {
	var rawdata = '';

	res.setEncoding('utf8');
	res.on('data', function(chunk) {
		// console.log(chunk);
		rawdata += chunk;
	});

	res.on('end', function() {
		console.log(rawdata);
		http.get(process.argv[3], function(res) {
			var rawdata = '';

			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				// console.log(chunk);
				rawdata += chunk;
			});

			res.on('err', function(err) {
				console.log(err);
			});

			res.on('end', function() {
				console.log(rawdata);
				http.get(process.argv[4], function(res) {
					var rawdata = '';

					res.setEncoding('utf8');
					res.on('data', function(chunk) {
						// console.log(chunk);
						rawdata += chunk;
					});

					res.on('err', function(err) {
						console.log(err);
					});

					res.on('end', function() {
						console.log(rawdata);
					});
				});
			});
		});
	});

	res.on('err', function(err) {
		console.log(err);
	});
});

********************************************/

/*********************************************************** STEP 10
var net = require('net');

var server = net.createServer(function(socket) {
	var date = new Date();
	var month = date.getMonth()+1;
	if (month < 10) {
		month = '0'+month;	
	}	
	socket.write(date.getFullYear()+'-'+month+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes() + '\n');
	socket.end();
}).listen(process.argv[2]);
*******************************************************************/

/************************************************************ STEP 11
var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
	var stream = fs.createReadStream(process.argv[3]);
	stream.on('open', function() {
		stream.pipe(res);
	});
	stream.on('close', function() {
		res.end();
	});
}).listen(process.argv[2]);
************************************************************************/

/************************************************************** STEP 12
var http = require('http');
var map = require('through2-map');

http.createServer(function (req, res) {
	if (req.method == 'POST') {
		var _map = map(function(chunk) {
			return chunk.toString().toUpperCase();
		});
		req.pipe(_map).pipe(res);
	};
}).listen('9000');
**********************************************************************/

/*************************************************************** STEP 13
var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
	var parseUrl = url.parse(req.url, true);

	switch(parseUrl.pathname) {
		case '/api/parsetime':
			var date = new Date(parseUrl.query.iso);
			res.writeHead(200, {
				"Content-Type":"application/json",
			});
			res.end(JSON.stringify({
				"hour":date.getHours(),
				"minute":date.getMinutes(),
				"second":date.getSeconds(),
			}));
			break;
		case '/api/unixtime':
			var date = new Date(parseUrl.query.iso);
			res.writeHead(200, {
				"Content-Type":"application/json",
			});
			res.end(JSON.stringify({
				"unixtime":date.getTime()
			}));
			break;
	}
}).listen(process.argv[2]);
*******************************************************************************/