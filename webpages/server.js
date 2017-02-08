'use static'
var express = require('express');
var app = express();
var util = require('../utility/utility.js');
var idCount = 2; //counter of id numbers used for new stories, starting at 2 as 1 is inserted initally.

//get methods for retrieving stories

//delete method, for removing a story from the array

app.use('/', express.static('webpages', { extensions: ['html'] }));

/*
 *  server functions for retrieving stories and uploading stories, I decided to
 *  create these functions separate from the get and post methods to keep the code
 *  more manageable.
 */
app.listen(8080);
