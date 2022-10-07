const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser');

const { connect } = require("./database/dbconection");
const { insertURL, getURL, validateUrl } = require('./controller/shortUrl');

connect();

// Basic Configuration
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

//my method
app.get('/api/shorturl/:id', getURL);

app.post('/api/shorturl', validateUrl, insertURL);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});