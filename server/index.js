const express = require('express');
const path = require('path');
let app = express();

app.use('/', express.static(path.join(__dirname, '../client/dist')));



let PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});