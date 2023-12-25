const express = require('express');
const {signupUser, loginUser, findUser} = require('../controllers/userController');
 
const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/find/:userId', findUser);


module.exports = router;