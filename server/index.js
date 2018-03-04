const express = require('express'); //unopinionated web framework for Nodejs
const path = require('path'); //path module provides utilities for working with file and directory paths
const mongoose = require('mongoose');  //mongodb object modeling for node.js
const cookieParser = require('cookie-parser');  // depercated -- Parse Cookie header and populate req.cookies with an object keyed by the cookie names. 
const bodyParser = require('body-parser'); //Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const db = require('../database/index');  //access to database indexjs
const auth = require('./utils/auth'); //access to utils auth.js

let app = express();  // assigned invoked express to app.  

let PORT = process.env.PORT || 3000; //Heroku: whatever is in the environment variable PORT, or 3000

/* Authentication Packages */
const session = require('express-session'); // session middleware
const MongoStore = require('connect-mongo')(session); //express integration MongoDB session store for Connect and Express
const passport = require('passport'); //authentication middleware for Node.js.
const LocalStrategy = require('passport-local').Strategy; //Passport strategy.

app.use(bodyParser.json());  //Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option. This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings. //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
app.use(bodyParser.urlencoded({ extended: true })); //Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.  A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client/dist'))); //static files index.html.

/* Express Session */
app.use(session({
  secret: 'This is our secret',  //This is the secret used to sign the session ID cookie. This can be either a string for a single secret, or an array of multiple secrets. If an array of secrets is provided, only the first element will be used to sign the session ID cookie, while all the elements will be considered when verifying the signature in requests.
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request. Depending on your store this may be necessary, but it can also create race conditions where a client makes two parallel requests to your server and changes made to the session in one request may get overwritten when the other request ends, even if it made no changes (this behavior also depends on what store you're using). ->How do I know if this is necessary for my store? The best way to know is to check with your store if it implements the touch method.If it does, then you can safely set resave: false. If it does not implement the touch method and your store sets an expiration date on stored sessions, then you likely need resave: tr
  saveUninitialized: false,  //Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie. Choosing false will also help with race conditions where a client makes multiple parallel requests without a session.Note if you are using Session in conjunction with PassportJS, Passport will add an empty Passport object to the session for use after a user is authenticated, which will be treated as a modification to the session, causing it to be saved. This has been fixed in PassportJS 0.3.0
  store: new MongoStore({ //The session store instance, using mangodb to store
    mongooseConnection: db.connection,  //reuse mongoose connection connecting to mongodb
    ttl: 2 * 24 * 60 * 60 //if session expiration not available, set to 2 days
  })
}));

/* Passport init/config */
app.use(passport.initialize());
app.use(passport.session()); // needed if application uses persistent login sessions, 

passport.use(new LocalStrategy((username, password, done) => { //Passport style Verify Callback check usernama and password. if the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated.
  db.getUser(username, (err, user) => {//** we are not validating the password
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

passport.serializeUser((user_id, done) => { //typical web application, the credentials used to authenticate a user will only be transmitted during the login request. If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser. Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.
  done(null, user_id);
});

passport.deserializeUser((user_id, done) => {
  User.getUserById(user_id, (err, user) => {
    done(err, user);
  });
  // done(null, user_id);
});


//print out the session/cookie and user on the term midware
app.use((req, res, next) => {
  console.log('req.session:', req.session);
  console.log('==========');
  console.log('req.session.user', req.session.user);
  next();
});

// recieve post reqeust from login endpoint & process using utils and database query
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

// recieve post reqeust from checkuser endpoint & process using utils and database query
app.post('/checkuser', (req, res) => {
  db.checkUser(req.body, function(err, result) {
    if (err) {
      res.status(500).send({ error: 'Error checking username' });
    } else {
      res.send(result);
    }
  });
});

// recieve post reqeust from checkuser endpoint & process using utils and database query
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
              req.login(user_id, (err) => {//
                console.log('logged in...redirecting...');
                // res.redirect('/');
                // 
                res.send(result);//
              });
            }
          });
        }
      });
    }
  });
});

app.post('/getlisting', passport.authenticate('local'), (req, res) => {
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

app.route('/*')
   .get((req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});