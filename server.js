var express = require('express');
var app = express();
var path = require('path');

// Define the port to run on
app.set('port', 3000);

app.use('/', express.static('webpages', { extensions: ['html'] }));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Server running on port' + port);
});
