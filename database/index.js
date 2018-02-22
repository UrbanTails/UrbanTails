const mongoose = require('mongoose');
let uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/users'

mongoose.connect(uristring, (err, res) => {
  if (err) {
    console.log('Failed to connect to: ' + uristring + '.' + err);
  } else {
    console.log('Connected to: ' + uristring);
  }
});

let PetOwnerSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String
});

let PetOwner = mongoose.model('PetOwner', PetOwnerSchema);

