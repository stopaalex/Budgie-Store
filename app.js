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

app.get('/test/pg', async (req, res) => {
  try {
    const url = 'postgres://behtoxtlkyrvpw:a159816172a8e6d1e4459f44f7585a0886ea68b241d937a0f6e64dbfccf1774c@ec2-52-206-193-199.compute-1.amazonaws.com:5432/d45deedn8d8ae9'
    const { Client } = require('pg')
    const client = new Client()
    await client.connect()
    const result = await client.query('SELECT * FROM budgie_Data;');
    console.log(res.rows[0].message) // Hello world!
    await client.end()
    res.send(JSON.stringify(result.rows))
  } catch (err) {
    res.send(JSON.stringify(err));
  }

  // const pg = require('pg');

  // await pg.connect(url);
  // const result = pg.query('SELECT * FROM budgie_data;');
  // console.log(result);
  // res.send('---');
  // pg.connect(url, ())
  
})

// serve up build
app.get('*', (req, res) => {
  res.send('Hello to the db server');
});

const PORT = process.env.PORT || 5000;
console.log('server stated on port: ', PORT);
app.listen(PORT);