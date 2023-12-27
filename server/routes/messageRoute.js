const express = require('express');
const { getChatMessages, createMessage } = require('../controllers/messageController');

const router = express.Router();

router.get('/chatMessages/:chatId', getChatMessages);
router.post('/createMessage' , createMessage);


module.exports = router;