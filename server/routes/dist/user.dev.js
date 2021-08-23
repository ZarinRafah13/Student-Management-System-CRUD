"use strict";

var express = require('express');

var router = express.Router();

var userController = require('../controllers/userController'); //create, update, delete


router.get('/', userController.view);
router.post('/', userController.find);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
module.exports = router;