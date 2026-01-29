const express = require('express');
const {signUpUser , loginUser, getCurrentUser, getAllUsers, updateUser, deleteUser} = require ('../controllers/userController');
const authenticate = require('../middleware/auth');
const isAdmin = require('../middleware/admin');
const router = express.Router();

router.post('/SignUp-form', signUpUser);
router.post('/', loginUser);
router.get('/me', authenticate, getCurrentUser);

// Admin only routes
router.get('/all', authenticate, isAdmin, getAllUsers);
router.put('/:id', authenticate, isAdmin, updateUser);
router.delete('/:id', authenticate, isAdmin, deleteUser);

module.exports = router;