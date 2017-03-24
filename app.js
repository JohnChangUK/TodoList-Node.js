var http = require('http');
var fs = require('fs');


var server = http.createServer(function(req, res) {
  console.log("REQ was made: " + req.url);
  res.writeHead(200, {
    "Content-Type": "application/json"
  });
    var myObj = {
      name: 'John',
      job: 'Software Developer',
      age: 22
    };
    res.end(JSON.stringify(myObj));
  });


server.listen(3000, '127.0.0.1');
console.log("Live on port 3000");