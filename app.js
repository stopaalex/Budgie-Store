// init define
const express = require("express");
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// define app
const app = express();
app.use(cors());

// get data
app.get('/get/data', (req, res) => {
  const data = fs.readFileSync('data/data.json', 'utf8');
  const rawData = JSON.parse(data);
  console.log(rawData);
  res.json(rawData);
})

// serve up build
app.get('*', (req, res) => {
  res.sendFile(path.resolve('/client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
console.log('server stated on port: ', PORT);
app.listen(PORT);