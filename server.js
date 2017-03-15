
var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');

var config = require('./sql_config.json');
var sql = mysql.createConnection(config.mysql);


// Define the port to run on
app.set('port', 8080);


app.use('/', express.static('webpages', { extensions: ['html'] }));


// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Server running on port ' + port);
});



 