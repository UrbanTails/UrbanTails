const mongoose = require('mongoose');
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

let PetOwnerSchema = new Schema({
  username: String,
  password: String,
  profileUrl: String,
  type: String,
  location: String,
  description: String
});

let HostSchema = new Schema({
  username: String,
  password: String,
  profileUrl: String,
  type: String,
  location: String,
  description: String
});

let PetOwner = mongoose.model('PetOwner', PetOwnerSchema);
let Host = mongoose.model('Host', HostSchema);


module.exports = {
  getUser: () => {

  },
  saveUser: (data, callback) => {
    let pass = data.password;

    bcrypt.hash(pass, saltRounds, (err, hash) => {
      let petOwner = new PetOwner ({
      username: data.username,
      password: hash,
      profileUrl: data.profileUrl,
      type: 'petOwner',
      location: data.location,
      description: data.description
      });


      petOwner.save((err, petOwner) => {
        callback(err, petOwner);
      });
    });

  },
  getHost: () => {

  },
  saveHost: (data, callback) => {
    let pass = data.password;

    bcrypt.hash(pass, saltRounds, (err, hash) => {
      let host = new Host ({
      username: data.username,
      password: hash,
      profileUrl: data.profileUrl,
      type: 'host',
      location: data.location,
      description: data.description
      });


      host.save((err, host) => {
        callback(err, host);
      });
    });


  },
  dropDatabase: () => {
    mongoose.connection.dropDatabase();
  }

};
