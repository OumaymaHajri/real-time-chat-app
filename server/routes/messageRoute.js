const express = require('express');
const { getChatMessages, createMessage,getLastMessage } = require('../controllers/messageController');

const router = express.Router();

router.get('/chatMessages/:chatId', getChatMessages);
router.get('/lastMessage/:chatId', getLastMessage);
router.post('/createMessage' , createMessage);


module.exports = router;