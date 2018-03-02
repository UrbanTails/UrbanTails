const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const saltRounds = 5;
let Schema = mongoose.Schema;
let uristring = process.env.MONGODB_URI || 'mongodb://localhost:27017/users';

mongoose.connect(uristring, (err) => {
  if (err) { console.log('mongodb not connected', err); }
  else {
    console.log('connected to database');
  }
});

let UserSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true},
  password: String,
  profileUrl: String,
  type: String,
  location: String,
  description: String
});

let User = mongoose.model('User', UserSchema);


module.exports = {
  checkUser: (data, callback) => {
    User.find({})
      .where('username').equals(data.username)
      .exec((err, user) => {
        if (err) {
          callback(err, null);
        } else if (!user.length) {
          console.log('User does not exist in the database');
          callback(null, false);
        } else {
          console.log('User already exists in the database');
          callback(null, true);
        }
      });
  },
  getUser: (data, callback) => {
    let attemptedPassword = data.password;

    User.find({})
      .where('username').equals(data.username)
      .exec((err, user) => {
      if (err) {
         console.log('Error retrieving user from database', err);
         callback(err, null);
      }
      else if (user[0]) {
        bcrypt.compare(attemptedPassword, user[0].password, (err, isMatch) => {
          if (err) { callback(err, null); }
          if (isMatch) {
            return callback(null, user);
          } else if (!isMatch) {
            callback('Password is not correct, try again', null);
          }
        });
      }
    });
  },

  saveUser: (data, callback) => {
    let plainTextPassword = data.password;

    bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
      let user = new User ({
      username: data.username,
      email: data.email,
      password: hash,
      profileUrl: data.profileUrl,
      type: data.type,
      location: data.location,
      description: data.description
      });

      user.save((err, user) => {
        if (err) {
          console.log('database error saving user, duplicate key');
          callback('User already exists', null);
        } else {
          callback(null, user);
        }
      });
    });

  },

  getListings: (data, callback) => {
    User.find({type: 'host'})
      .where('location').equals(data.query)
      .exec((err, listings) => {
        if (err) {
          console.log('Error getting listings');
          callback('Error getting listings');
        } else {
          callback(null, listings);
        }
      });
  },

  getAllListings: (data, callback) => {
    User.find({type: 'host'})
      .sort({location:1})
      .exec((err, listings) => {
        if (err) {
          console.log('Error getting all listings');
          callback('Error getting all listings');
        } else {
          callback(null, listings);
        }
      });
  },

  dropDatabase: () => {
    mongoose.connection.dropDatabase();
  }

};
