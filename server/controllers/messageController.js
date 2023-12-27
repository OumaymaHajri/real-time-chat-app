const messageModel = require('../models/message')


const createMessage = async(req, res) => {
    const {chatId, senderId, text}= req.body

    const message =  new messageModel({chatId, senderId, text})
    try {
        const response = await message.save()
        res.status(200).json(response)

        
    } catch (error) {
        res.status(500).json(error)
        
    }

}

const getChatMessages = async(req, res) => {
    const {chatId} = req.params;

     try {
        const response = await messageModel.find({chatId: chatId})
        res.status(200).json(response)

        
    } catch (error) {
        res.status(500).json(error)
        
    }

}



module.exports = {createMessage,getChatMessages};