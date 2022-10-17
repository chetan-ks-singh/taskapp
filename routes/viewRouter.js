const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController')

const router = express.Router();
router.use(authController.isLoggedInUser);

router.route('/auth/signup').get(viewController.getSignUpPage);
router.route('/auth/login').get(viewController.getLoginPage);
router.route('/dashboard').get(viewController.checkForDarkMode,viewController.getUserDashboard);


module.exports = router;