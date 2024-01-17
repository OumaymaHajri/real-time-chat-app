const express = require('express');
const { getChatMessages, createMessage,getLastMessage } = require('../controllers/messageController');

const router = express.Router();

router.get('/messages/:chatId', getChatMessages);
router.get('/last-message/:chatId', getLastMessage);
router.post('/message' , createMessage);


module.exports = router;