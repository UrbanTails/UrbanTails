const db = require('./database/index.js');
let sampleUserData = require('./sampleUserData.json');

db.dropDatabase();

sampleUserData.forEach((obj, err) => {
  db.saveUser(obj, (err, data) => {
    if (err) { console.log('error saving pet owner to database', err); }
    else { console.log('saved pet owner to the database', data); }
  });
});

