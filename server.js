
var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
var fs = require("fs");
var file = "test.db";
var exists = fs.existsSync(file);

//Initialising the database
var config = require('./sql_config.json');
var sql = mysql.createConnection(config.mysql);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);


// Define the port to run on
app.set('port', 8080);

//Use express to load the html webpages
app.use('/', express.static('webpages', { extensions: ['html'] }));

db.serialize(function () {
  if(!exists){
  db.run("CREATE TABLE Test (name,username,password)");
  }
});

db.serialize(function () {

  db.run("INSERT INTO Test VALUES (?, ?, ?)", ['a1', 'b1', 'c1']);
  db.run("INSERT INTO Test VALUES (?, ?, ?)", ['a2', 'b2', 'c2']);
  db.run("INSERT INTO Test VALUES (?, ?, ?)", ['a3', 'b3', 'c3']);
});

db.serialize(function () {
  db.each("SELECT * FROM Test", function (err, row) {
    console.log(row);
  });
});


db.close();

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Server running on port ' + port);
});


