var express = require('express');
var app = express();

app.use('/', express.static('webpages', { extensions: ['html'] }));

app.listen(8080);
