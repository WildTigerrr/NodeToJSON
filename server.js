var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('tickets', ['tickets']);
var bodyParser = require('body-parser');

var fs = require('fs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/tickets', function (req, res) {
  console.log('Page updated via GET request');
  var data = fs.readFileSync('./db.json');
  res.json(JSON.parse(data));
});

app.post('/tickets', function (req, res) {
  var data = fs.readFileSync('./db.json');
  var json = JSON.parse(data);
  console.log(req.body);
  json.data.push(req.body);
  console.log(json);
  var data = fs.writeFileSync('./db.json',JSON.stringify(json));
});

app.delete('/tickets/:id', function (req, res) {
  var id = req.params.id;
  var data = fs.readFileSync('./db.json');
  var json = JSON.parse(data);
  json.data.splice(id,1);
  console.log(json);
  var data = fs.writeFileSync('./db.json',JSON.stringify(json));
});

app.get('/tickets/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
});

app.put('/tickets/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  console.log(req.body);
  var data = fs.readFileSync('./db.json');
  var json = JSON.parse(data);
  json.data.splice(id, 1, req.body);
  console.log(json);
  var data = fs.writeFileSync('./db.json',JSON.stringify(json));  
});

app.listen(8080);
console.log("Server start at localhost/8080");