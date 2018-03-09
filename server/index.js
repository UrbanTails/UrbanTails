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

// Parses JSON, urls and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Serves static files to client
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

// creates new user session using Passport Local Strategy
passport.use(new LocalStrategy((username, password, done) => {
  db.getUser(username, (err, user) => {
    if (err) { console.log('error in passport local strategy get user', err); }
    else if (!user) {
      return done(null, false, {message: 'Unknown user'});
    } else {
      return done(null, user);
    }
  });
}));
// this function was utilized when making session without passport.  may or may not be utilized with passport depending on what you want to do.
app.use((req, res, next) => {
  next();
});
// validates user and logs user into a session via Express
app.post('/login', (req, res) => {
  auth.validateLoginForm(req.body, (result) => {
    if (result.success) {
      db.getUser(req.body, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          // first attempt at Express sessions without Passport
          req.session.user = result[0];
          res.send(result);
        }
      });
    } else {
      res.send(result);
    }
  });
});
// destroys session and logs user out
app.get('/logout', function (req, res){
  req.logOut();
  res.clearCookie('connect.sid', {path: '/'}).send('cleared');
});
// checks if user is in database (utilized on first Sign Up page)
app.post('/checkuser', (req, res) => {
  db.checkUser(req.body, function(err, result) {
    if (err) {
      res.status(500).send({ error: 'Error checking username' });
    } else {
      res.send(result);
    }
  });
});
// validates New User Sign Up form and saves new User to database
app.post('/signup', (req, res) => {
  auth.validateSignupForm(req.body, (result) => {
    if (result.success) {
      console.log(result);
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
              // creates persisting session with Passport
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
    } else if (result) {
      console.log(result);
      res.status(500).send(result);
    }
  });
});
// authenticates pet owner user upon login and retrieves profile
app.get('/pet-profile', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) { return res.redirect('/login'); }
    else {
      return res.send(req.user);
    }
  })(req, res, next);
});
// authenticates host user upon login and retrieves profile
app.get('/host-profile', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) { return res.redirect('/login'); }
    else {
      return res.send(req.user);
    }
  })(req, res, next);
});

//updates profile information for given user
app.post('/update-profile', (req, res) => {
  //update database here
}

// retrieves all host listings from the database
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
// retrieves one host listing based on a string search query for either 'Los Angeles' or 'New York'.  Could be substituted with Google Search API.
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
// creates passport session for user by serialized ID
passport.serializeUser((user_id, done) => {
  done(null, user_id);
});
// deserializes the user ID for passport to deliver to the session
passport.deserializeUser((user_id, done) => {
  User.getUserById(user_id, (err, user) => {
    done(err, user);
  });
  // done(null, user_id);
});
// wild card routing all pages to the React Router
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

//sends booking information with host, owner, dates
app.post('/book', (req, res) => {
  db.saveOwnerBook(req.body, (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Could not save owner info' });
    }
  });
  db.saveHostBook(req.body, (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Cound not save host info'});
    }
  })
  res.send(200)
})


