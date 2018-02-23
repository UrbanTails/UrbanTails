const mongoose = require('mongoose');
var Schema = mongoose.Schema;
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
  type: String
});

let HostSchema = new Schema({
  username: String,
  password: String,
  type: String
});

let PetOwner = mongoose.model('PetOwner', PetOwnerSchema);
let Host = mongoose.model('Host', HostSchema);


module.exports = {
  saveUser: (data, callback) => {
    let petOwner = new PetOwner ({
      username: data.username,
      password: data.password,
      type: 'petOwner'
    });

    petOwner.save((err, petOwner) => {
      callback(err, petOwner);
    });
  },
  saveHost: (data, callback) => {
    let host = new Host ({
      username: data.username,
      password: data.password,
      type: 'host'
    });

    host.save((err, host) => {
      callback(err, host);
    })
  }
};
