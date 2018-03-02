const express = require('express');
const path = require('path');
const session = require('express-session');

const bodyParser = require('body-parser');
const db = require('../database/index');
let app = express();

let PORT = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'This is our secret',
  resave: false,
  saveUninitialized: true
}));

app.route('/login')
   .post((req, res) => {

    db.getUser(req.body, (err, result) => {
      if (err) { res.send(err); }
      else {
        req.session.user = result[0];
        res.send(result);
      }
    });
});

app.route('/checkuser')
   .post((req, res) => {

    db.checkUser(req.body, function(err, result) {
      if (err) {
        res.status(500).send({ error: 'Error checking username' });
      } else {
        res.send(result);
      }
    });
});

app.route('/signup')
   .post((req, res) => {

    db.saveUser(req.body, (err, result) => {
      if (err) {
        console.log('error saving user data to db:', err);
        res.status(500).send({ error: 'User already exists' });
      }
      else {
        console.log('saved user data to the db:', result);
        res.send(result);
      }
    });
});

app.route('/pet-profile')
  .get((req, res) => {
    if (!req.session.user) {
      return res.status(401).send();
    }
    return res.status(200).send('Welcome to UrbanTails!');
});

app.route('/host-profile')
  .get((req, res) => {
    if (!req.session.user) {
      return res.status(401).send();
    }
    return res.status(200).send('Welcome to UrbanTails!');
});

app.route('/getlistings')
  .get((req, res) => {
    db.getAllListings(req.body, (err, result) => {
      if (err) {
        console.log('error getting all listings from db:', err);
        res.status(500).send({ error: 'Could not retrieve all listings' });
      }
      else {
        console.log('retrieved all listings');
        res.send(result)
      }
    });
  })
  .post((req, res) => {
    db.getListings(req.body, (err, result) => {
      if (err) {
        console.log('error getting listings from db:', err);
        res.status(500).send({ error: 'Could not retrieve listings' });
      }
      else {
        console.log('retrieved listings from', result[0].location);
        res.send(result);
      }
    });
});

app.route('/*')
   .get((req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});