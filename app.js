// init define
const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// define app
const app = express();
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// get data
app.get('/get/data', (req, res) => {
  const data = fs.readFileSync('data/data.json', 'utf8');
  const rawData = JSON.parse(data);
  console.log(rawData);
  res.json(rawData);
})

app.put('/put/data', (req, res) => {
  try {
    const data = {"data": req.body};
    fs.writeFileSync('data/data.json', JSON.stringify(data));
    res.json({status: 200})
  } catch (err) {
    res.json({status: 500})
  }
})

// serve up build
app.get('*', (req, res) => {
  res.send('Hello to the db server');
});

const PORT = process.env.PORT || 5000;
console.log('server stated on port: ', PORT);
app.listen(PORT);