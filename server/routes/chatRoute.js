const express = require('express');
const router = express.Router();

const { createChat,getChat ,getUserChats} = require('../controllers/chatController');

router.post('/createChat', createChat);
router.get('/getUserChats/:userId', getUserChats);
router.get('/getChat/:firstId/:secondId', getChat);



module.exports = router;