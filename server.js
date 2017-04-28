
var express = require('express');
var app = express();
var path = require('path');
var sqlite3 = require('sqlite3').verbose();


//Initialising the database
var db = new sqlite3.Database('toDoDB');
db.run("create table if not exists toDoList (id INTEGER PRIMARY KEY AUTOINCREMENT, email STRING,password STRING)");

function updateDB(req, res) {
    var data = []
    var paramaters = req.params.email+req.params.password
    var email = paramaters.substring(0, 21);
    var password = paramaters.substring(21,paramaters.length)
    db.run("INSERT INTO toDoList (email, password) VALUES (?,?)", [email,password]);
    res.sendStatus(200);

    db.each("SELECT id,email,password from toDoList", function (err,row) {
      data.push(row.id,row.email,row.password);
    }, function () {
    console.log(data);
  });
}

// Define the port to run on
app.set('port', 8080);

//Use express to load the html webpages
app.use('/', express.static('webpages', { extensions: ['html'] }));
app.post('/scout/create/:email:password', updateDB);
app.listen(8080);
