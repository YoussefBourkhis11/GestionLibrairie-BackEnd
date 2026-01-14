const express = require('express');
const {signUpUser , loginUser} = require ('../controllers/userController');
const router = express.Router();

router.post('/SignUp-form', signUpUser);
router.post('/', loginUser);

module.exports = router;