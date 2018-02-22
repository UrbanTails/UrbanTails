const express = require('express');
const path = require('path');
const db = require('../database/index');
let app = express();


app.use('/', express.static(path.join(__dirname, '../client/dist')));


app.post('/login', function(req, res) {
  res.send();
});

app.post('/signup', function(req, res) {
 res.send();
});

app.post('user', function(req, res) {
  res.send();
});

let PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});