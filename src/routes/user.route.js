const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { getUserProfile, updateUserProfile, createUserProfile } = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');


router.get('/', userController.getAllUsers);

// Protected routes
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;
