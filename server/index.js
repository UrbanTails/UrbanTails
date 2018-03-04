const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('../database/index');
const auth = require('./utils/auth');

let app = express();

let PORT = process.env.PORT || 3000;

// Authentication Packages
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client/dist')));

// Express Session
app.use(session({
  secret: 'This is our secret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db.connection,
    ttl: 2 * 24 * 60 * 60
  })
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
  db.getUser(username, (err, user) => {
    if (err) { console.log('error in passport local strategy get user', err); }
    else if (!user) {
      return done(null, false, {message: 'Unknown user'});
    } else {
      return done(null, user);
    }
  });
  // db.User.findOne({username: username}, (err, user) => {
  //   if (err) { return done(err); }
  //   if (!user) {
  //     return done(null, false, {message: 'Incorrect username.'});
  //   }
  //   if (!user.validPassword(password)) {
  //     return done(null, fale, {message: 'Incorrect password'});
  //   }
  //   return done(null, user);
  // });
}));

app.use((req, res, next) => {
  console.log('req.session:', req.session);
  console.log('==========');
  console.log('req.session.user', req.session.user);
  next();
});

app.post('/login', (req, res) => {
  auth.validateLoginForm(req.body, (result) => {
    if (result.success) {
      db.getUser(req.body, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          req.session.user = result[0];
          res.send(result);
        }
      });
    } else {
      res.send(result);
    }
  });
});

app.post('/checkuser', (req, res) => {
  db.checkUser(req.body, function(err, result) {
    if (err) {
      res.status(500).send({ error: 'Error checking username' });
    } else {
      res.send(result);
    }
  });
});

app.post('/signup', (req, res) => {
  auth.validateSignupForm(req.body, (result) => {
    if (result.success) {
      db.saveUser(req.body, (err, result) => {
        if (err) {
          console.log('error saving user data to db:', err);
          res.status(500).send({ error: 'User already exists' });
        }
        else {
          console.log('saved user data to the db:', result);
          db.getUser(req.body, (err, result) => {
            if (err) { res.send(err); }
            else {
              console.log('result db.getUser', result);
              const user_id = result._id;
              req.login(user_id, (err) => {
                console.log('logged in...redirecting...');
                // res.redirect('/');
                res.send(result);
              });
            }
          });
        }
      });
    }
  });
});

app.get('/pet-profile', passport.authenticate('local'), (req, res) => {
    console.log('pet profile authenticated');
    return res.status(200).send(req.user);
});

app.get('/host-profile', passport.authenticate('local'), (req, res) => {
    console.log('host profile authenticated');
    return res.status(200).send(req.user);
});

app.get('/getlistings', (req, res) => {
    db.getAllListings((err, result) => {
      if (err) {
        console.log('error getting all listings from db:', err);
        res.status(500).send({ error: 'Could not retrieve all listings' });
      }
      else {
        console.log('retrieved all listings');
        res.send(result)
      }
    });
});

app.post('/getlistings', (req, res) => {
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

passport.serializeUser((user_id, done) => {
  done(null, user_id);
});

passport.deserializeUser((user_id, done) => {
  User.getUserById(user_id, (err, user) => {
    done(err, user);
  });
  // done(null, user_id);
});

app.route('/*')
   .get((req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});