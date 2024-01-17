const express = require('express');
const router = express.Router();

const { createChat,getChat ,getUserChats} = require('../controllers/chatController');

router.post('/new-chat', createChat);
router.get('/chats/:userId', getUserChats);
router.get('/chat/:firstId/:secondId', getChat);



module.exports = router;