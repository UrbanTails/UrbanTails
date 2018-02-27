const db = require('./database/index.js');
let samplePetOwners = require('./samplePetOwners.json');
let sampleHosts = require('./sampleHosts.json');

db.dropDatabase();


samplePetOwners.forEach((obj, err) => {
  db.saveUser(obj, (err, data) => {
    if (err) { console.log('error saving pet owner to database', err); }
    else { console.log('saved pet owner to the database', data); }
  });
});

sampleHosts.forEach((obj, err) => {
  db.saveHost(obj, (err, data) => {
    if (err) { console.log('error saving host to database', err); }
    else { console.log('saved host to the database', data); }
  });
});
