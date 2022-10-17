const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').post(userController.createUser);
router.route('/login').post(authController.login);
router.route('/updateMe').patch(authController.isLoggedInUser,userController.updateMe)
router.route('/logout').get(authController.logout);


module.exports  = router;

