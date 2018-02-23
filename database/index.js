const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// mongoose.connect(uristring, (err, res) => {
//   if (err) {
//     console.log('Failed to connect to: ' + uristring + '.' + err);
//   } else {
//     console.log('Connected to: ' + uristring);
//   }
// });

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
}

module.exports.saveUser = saveUser;
