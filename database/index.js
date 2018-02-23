const mongoose = require('mongoose');
let uristring = process.env.MONGODB_URI || 'mongodb://localhost:27017/users';

const bcrypt = require('bcrypt');

mongoose.connect(uristring, (err) => {
  if (err) { console.log('mongodb not connected', err); }
  else {
    console.log('connected to database');
  }
});

let PetOwnerSchema = mongoose.Schema({
  username: String,
  password: String
});

let PetOwner = mongoose.model('PetOwner', PetOwnerSchema);

let saveUser = (data, callback) => {
  let petOwner = new PetOwner ({
    username: data.username,
    password: data.password
  });

  petOwner.save((err, petOwner) => {
    callback(err, petOwner);
  });
};

module.exports.saveUser = saveUser;
