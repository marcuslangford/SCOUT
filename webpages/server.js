'use static'
var express = require('express');
var app = express();
var util = require('../utility/utility.js');
var idCount = 2; //counter of id numbers used for new stories, starting at 2 as 1 is inserted initally.
var initialStories = [
  {
    "id": 1,
    "author": "Luke Skywalker",
    "title": "Hello world!",
    "text": "So I decided to join jsbook like everyone else. What does one post here?"
  }
];
var stories = JSON.parse(JSON.stringify(initialStories)); //Cloned array of stories to change separate from the original

//get methods for retrieving stories.
app.get('/api/stories', sendStories);
app.get('/api/x/oldest', sendStories);
app.get('/api/stories/newest', sendStories);

//post method for add a new story from jsbook
app.post('/api/stories', uploadStory);

//delete method, for removing a story from the array
app.delete('/api/stories', function (req, res) {
  for(var i = 0; i < stories.length; i++){               //looping through the stories to find the matching id
    if(req.query.id == stories[i].id){
      stories = util.removeFromArray(stories, stories.indexOf(stories[i])); //calling removeFromArray with the found index of the array
      res.statusCode = 200;
      res.end();
    }
    else if(req.query.id != stories[i].id && i == stories.length - 1){      //if no story in array matches the query id, return 404
      res.statusCode = 404;
      res.end();
    }
  }
})
app.use('/', express.static('webpages', { extensions: ['html'] }));

/*
 *  server functions for retrieving stories and uploading stories, I decided to
 *  create these functions separate from the get and post methods to keep the code
 *  more manageable.
 */

function sendStories(req, res){
  tempStories = [];
  //Newest, oldest and all stories
  if(req.url == '/api/stories/newest'){
    res.send(stories[0]);
  }
  else if(req.url == '/api/stories/oldest'){
    res.send(stories.slice(-1)[0]);
  }
  else if(req.url == '/api/stories' || req.query.p == '0'){
    res.send(JSON.stringify(stories));
  }

  //splitting array of stories into their pages, allows for extra pages when stories are added
  else{
    var page = parseInt(req.query.p);  //page that is being requested

    //if a user accidentally requests a page less than 0, the first page of results is returned
    if(page < 0){
      page = 1;
    }
    //using a temporary array to store the sliced array to break up the code as I think it's more readable
    tempStories = stories.slice((page-1)*10, (page*10));
    res.send(JSON.stringify(tempStories));
  }
}

function uploadStory(req, res){
  //set story attributes from the query parameters
  var author = req.query.author,
      title = req.query.title,
      text = req.query.text;

  //create new story object to be inserted into the array with attributes from above
  var newStory =
    {
      "id": idCount,            //using an incremented variable to add a unique id
      "author": author,
      "title": title,
      "text": text
    };

  stories.unshift(newStory);  //using unshift to add the story to front of the array.
  idCount += 1;               //incrementing the id counter so the next story has a new id.
  res.send(newStory);         //return just the new story as the response.
}
app.listen(8080);
