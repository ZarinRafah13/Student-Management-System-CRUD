const express = require('express');
const router= express.Router();
const userController = require('../controllers/userController');

//create, update, delete
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
router.get('/edituser/:ID', userController.edit);
router.post('/edituser/:ID', userController.update);
router.get('/viewuser/:ID', userController.viewall);
router.get('/:ID', userController.delete);



module.exports = router;