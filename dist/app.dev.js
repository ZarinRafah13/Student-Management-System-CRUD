"use strict";

var express = require('express');

var exphbs = require('express-handlebars');

var bodyParser = require('body-parser');

var mysql = require('mysql');

require('dotenv').config();

var app = express();
var port = process.env.PORT || 5000; // Parsing middleware
// Parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
  extended: false
})); // Parse application/json

app.use(bodyParser.json()); // static files

app.use(express["static"]('public')); // Templeting engines

app.engine('hbs', exphbs({
  extname: '.hbs'
}));
app.set('view engine', 'hbs'); //connectionPool

var pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}); //connect to database

pool.getConnection(function (err, connection) {
  if (err) throw err;
  console.log('connected as ID ' + connection.threadId);
});

var routes = require('./server/routes/user');

app.use('/', routes);
app.listen(port, function () {
  return console.log("Listening on port ".concat(port));
});