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
  email: String,
  password: String,
  profileUrl: String,
  type: String,
  location: String,
  description: String
});

let User = mongoose.model('User', UserSchema);


module.exports = {
  getUser: (data, callback) => {
    let attemptedPassword = data.password;

    User.find({})
      .where('username').equals(data.username)
      .exec((err, user) => {
      if (err) {
        console.log('Error retrieving user from database', err);
         callback(err, null);
      }
      else {
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
          // callback(err, null);
        } else {
          callback(null, user);
        }
      });
    });

  },

  dropDatabase: () => {
    mongoose.connection.dropDatabase();
  }

};
