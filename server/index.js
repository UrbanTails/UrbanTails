const express = require('express');
const router = express.Router();
const path = require('path');



const bodyParser = require('body-parser');
const db = require('../database/index');
let app = express();


app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/login')
  .post((req, res) => {
    // TODO: fetch user from db
    console.log(req.body)
    res.send('login POST');
  });

app.route('/users')
  .get((req, res) => {
    res.send('user GET');
  })
  .post((req, res) => {
    res.send('user POST');
  });

app.route('/signup')
  .post((req, res) => {
  console.log('posting new user to db:', req.body);

  db.saveUser(req.body, (err, result) => {
    if (err) { console.log('error saving to db:', err); }
    else {
      console.log('saved to the db:', result);
      // send to profile page

      res.send(result);
    }

  });

});

app.route('/messages', (req, res) => {

});

let PORT = process.env.PORT || 3000;


app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

