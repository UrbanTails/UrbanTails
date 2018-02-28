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
      if (err) { return handleError(err); }
      else {
        bcrypt.compare(attemptedPassword, user[0].password, (err, isMatch) => {
          if (isMatch) {
            callback(null, user);
          } else {
            console.log('error: password not correct');
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
        callback(err, user);
      });
    });

  },

  dropDatabase: () => {
    mongoose.connection.dropDatabase();
  }

};
