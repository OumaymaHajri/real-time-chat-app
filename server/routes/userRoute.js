const express = require('express');
const {signupUser, loginUser, findUser, getUsers} = require('../controllers/userController');
 
const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/find/:userId', findUser);
router.get('/getusers/:searchTerm', getUsers);



module.exports = router;