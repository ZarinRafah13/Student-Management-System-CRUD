"use strict";

var mysql = require('mysql'); //connectionPool


var pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}); //view users

exports.view = function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log('connected as ID ' + connection.threadId); //user the connection

    connection.query('SELECT * FROM Student', function (err, rows) {
      // when done with the connection, release it
      connection.release();

      if (!err) {
        res.render('home', {
          rows: rows
        });
      } else {
        console.log(err);
      }

      console.log('the data from user table: \n', rows);
    });
  });
}; //find from search


exports.find = function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log('connected as ID ' + connection.threadId);
    var searchTerm = req.body.search; //user the connection

    connection.query('SELECT * FROM Student WHERE first_name LIKE ? || last_name LIKE ? || ID LIKE ? || Room LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], function (err, rows) {
      // when done with the connection, release it
      connection.release();

      if (!err) {
        res.render('home', {
          rows: rows
        });
      } else {
        console.log(err);
      }

      console.log('the data from user table: \n', rows);
    });
  });
};

exports.form = function (req, res) {
  res.render('add-user');
}; //Add User


exports.create = function (req, res) {
  var _req$body = req.body,
      ID = _req$body.ID,
      first_name = _req$body.first_name,
      last_name = _req$body.last_name,
      Contact = _req$body.Contact,
      Room = _req$body.Room,
      Address = _req$body.Address,
      Comment = _req$body.Comment;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log('connected as ID ' + connection.threadId); //user the connection

    connection.query('INSERT INTO student SET ID = ?, first_name = ? ,last_name = ? ,Contact = ? ,Room = ? ,Address = ? ,Comment = ? ', [ID, first_name, last_name, Contact, Room, Address, Comment], function (err, rows) {
      // when done with the connection, release it
      connection.release();

      if (!err) {
        res.render('add-user');
      } else {
        console.log(err);
      }

      console.log('the data from user table: \n', rows);
    });
  });
};