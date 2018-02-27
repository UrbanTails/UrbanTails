const express = require('express');
const router = express.Router();
const path = require('path');



const bodyParser = require('body-parser');
const db = require('../database/index');
let app = express();


app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/login')
  .post((req, res) => {
    console.log('getting user from database:', req.body);

    if(req.body.type === 'petOwner') {
      db.getUser(req.body, (err, result) => {
        if (err) { console.log('error getting petOwner data from db:', err); }
        else {
          console.log('got petOwner data from the db:', result);
          // send to profile page
          res.send(result);
        }
      });
    }

    if(req.body.type === 'host') {
      db.getHost(req.body, (err, result) => {
        if (err) { console.log('error getting host data from db::', err); }
        else {
          console.log('got host data from the db:', result);
          // send to profile page
          res.send(result);
        }
      });
    }
});

app.route('/users')
  .get((req, res) => {
    res.send('user GET');
  })
  .post((req, res) => {
    res.send('user POST');
});

app.route('/signup')
  .post((req, res) => {
  console.log('posting new user to db:', req.body);

  if(req.body.type === 'petOwner') {
    db.saveUser(req.body, (err, result) => {
      if (err) { console.log('error saving petOwner data to db:', err); }
      else {
        console.log('saved petOwner data to the db:', result);
        // send to profile page
        res.send(result);
      }
    });
  }

  if(req.body.type === 'host') {
    db.saveHost(req.body, (err, result) => {
      if (err) { console.log('error saving host data to db:', err); }
      else {
        console.log('saved host data to the db:', result);
        // send to profile page
        res.send(result);
      }
    });
  }

});



app.route('/messages', (req, res) => {

});

let PORT = process.env.PORT || 3000;


app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});
