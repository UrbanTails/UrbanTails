const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //adds pre-save validation for unique fields within a Mongoose schema.
const passportLocalMongoose = require('passport-local-mongoose'); //simplifies building username and password login with Passport.
const bcrypt = require('bcrypt'); // handles password hashing in the database
const saltRounds = 5;
let Schema = mongoose.Schema;
let uristring = process.env.MONGODB_URI || 'mongodb://localhost:27017/users';
//establish connection
mongoose.connect(uristring, (err) => {
  if (err) { console.log('mongodb not connected', err); }
  else {
    console.log('connected to database');
  }
});


//set schema
let UserSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true},
  password: String,
  profileUrl: String,
  type: String,
  location: Object,
  description: String,
  price: Number,
  userBookings: Array,
  hostBookings: Array
});

//compile schema into a model
let User = mongoose.model('User', UserSchema);


module.exports = {
//database search function to ID whether uniq user exist in the db returns boolean
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
//database search function to get user information
  getUser: (data, callback) => {
    let attemptedPassword = data.password;

    User.find({})
      .where('username').equals(data.username)
      .exec((err, user) => {
        if (user.length === 0) {
          err = {
            errors: { username: 'User does not exist' }
          };
          callback(err, null);
        }
        else if (user[0]) {
          let message = { errors: { password: 'Incorrect submission, try again'} };

          bcrypt.compare(attemptedPassword, user[0].password, (err, isMatch) => {
            if (err) { callback(err, null); }
            if (isMatch) {
              return callback(null, user);
            } else if (!isMatch) {
              callback(message, null);
            }
          });
        }
    });
  },
  //get user by id to feed deserialize user.
  getUserById: (id, callback) => {
    User.findById(id, callback);
  },

  //save user data
  saveUser: (data, callback) => {
    let plainTextPassword = data.password;
    //bcrypt password before saving it to database
    bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
      let user = new User ({
      username: data.username,
      email: data.email,
      password: hash,
      price: data.price,
      profileUrl: data.profileUrl,
      type: data.type,
      location: data.location,
      description: data.description,
      userBookings: [],
      hostBookings: []
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

  updateUser: (data, callback) => {
    User.findOne({ username: data.username }, function(err, user) {
      if (data.imageUrl) user.profileUrl = data.imageUrl;
      if (data.location) user.location = data.location;
      if (data.description) user.description = data.description;
      if (data.email) user.email = data.email;
      if (data.price) user.price = data.price;
      user.save();
      callback(null, user);
    });
  },


  // retrieve host listings by a specific location
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
  // retrieve all host listings in the database
  getAllListings: (callback) => {
    //remove host type and it works
    User.find({type: 'host', 'location.city': 'Seattle'})
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
  getCityListings: (city, callback) => {
    User.find({type:'host', 'location.city': city})
      .sort({username: 1})
      .exec((err, listings) => {
        if (err) {
          console.log('Error getting all listings');
          callback('Error getting all listings');
        } else {
          callback(null, listings);
        }
      });
  },
  // utilized by seed.js file to drop database when re-seeding
  dropDatabase: () => {
    mongoose.connection.dropDatabase();
  },

  //takes in booking from listing page and saves info to userBookings
  saveUserBook: (data, callback) => {
    var userBooking = {
      userName: data.userName,
      hostName: data.hostName,
      location: data.location,
      startDate: data.startDate,
      enddate: data.endDate,
      profileUrl: data.profileUrl,
      approved: data.approved
    };
    User.findOneAndUpdate({username: data.userName}, {$push: {userBookings: userBooking}}).exec((err, user) => {
      if (err) {
        callback('Error finding user');
      } else {
        callback(null, 'Success saving user info');
      }
    });
  },

  //takes in booking from listing page and saves info to hostBookings
  saveHostBook: (data, callback) => {
    var hostBooking = {
      userName: data.userName,
      hostName: data.hostName,
      location: data.location,
      startDate: data.startDate,
      enddate: data.endDate,
      profileUrl: data.profileUrl,
      approved: data.approved
    };
    User.findOneAndUpdate({username: data.hostName}, {$push: {hostBookings: hostBooking}}).exec((err, user) => {
      if (err) {
        callback('Error finding user');
      } else {
        callback(null, 'Success saving user info');
      }
    });
  },

  //update hostbooking approval status to true
  approveHostBooking: (data, callback) => {
    //find user, find hostbooking with matching name
    console.log('DATA', data);
    User.update({'hostBookings.userName': data.userName, 'hostBookings.hostName': data.hostName}, 
      {'$set': {'hostBookings.$.approved': true}}, 
      function(err, result) {
        if (err) {
          callback(err);
        } else {
            User.findOne({ username: data.hostName}, function(err, user) {
            callback(null, user.hostBookings);
          })
        }
    });
  },

  //update userbooking approval status to true
  approveUserBooking: (data, callback) => {
    console.log('hostname', data.hostName);
    console.log('username', data.userName);
    User.update({'userBookings.hostName': data.hostName, 'userBookings.userName': data.userName}, 
      {'$set': {'userBookings.$.approved': true}}, 
      function(err, result) {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
    });
  },

  // exports mongoose connection for server to reference
  connection: mongoose.connection
};

