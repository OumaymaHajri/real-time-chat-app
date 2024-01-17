const express = require('express');
const {signupUser, loginUser, findUser, getUsers} = require('../controllers/userController');
 
const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/user/:userId', findUser);
router.get('/users/:searchTerm', getUsers);



module.exports = router;