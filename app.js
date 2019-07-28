const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const routes = require('../app/routes');
const appConfig = require('../app/config/app');
const path = require('path');

const app = express();
const port = appConfig.port;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));

MongoClient.connect(db.url, (err, database) => {	
  if (err) return console.log(err);

  routes(app, database);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})



