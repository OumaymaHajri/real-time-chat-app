

import axios from 'axios';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
export const ChatContext = createContext();



export const ChatProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [userChatError, setUserChatError] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [sendMessageError, setSendMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    
 




    // initial socket
    useEffect(() => {
        const newSocket = io("http://localhost:4000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }

    }, [user]);

    useEffect(() => {
        if (socket == null) return;
        socket.emit('addNewUser', user?._id);
        socket.on('getOnlineUsers', (res) => {
            setOnlineUsers(res);
        });
        return () => {
            socket.off('getOnlineUsers');
        };




    }, [socket]);

    // send message socket
    useEffect(() => {
        if (socket == null) return;
        const recipientId = currentChat?.members?.find((id) => id !== user?._id);

        socket.emit('sendMessage', { ...newMessage, recipientId });

    }, [newMessage]);

    // recieve message
    useEffect(() => {
        if (socket == null) return;

        socket.on('getMessage', (res) => {
            if (currentChat?._id !== res.chatId) return;
            setMessages((prev) => [...prev, res]);
        });
        return () => {
            socket.off('getMessage');
        };


    }, [socket, currentChat]);



    useEffect(() => {

        const getUserChats = async () => {
            setUserChats(null);

            if (user) {

                const response = await axios.get(`http://localhost:5000/api/chat/getUserChats/${user?._id}`);
                setUserChats(response.data);

 

            }

        }
        getUserChats();

    }, [user]);




    useEffect(() => {

        const getMessages = async () => {
            if (user?._id) {
                setUserChatError(null);

                const response = await axios.get(`http://localhost:5000/api/messages/chatMessages/${currentChat?._id}`);
                setMessages(response.data);
            }
        }
        getMessages();

    }, [currentChat]);

    const getCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);



    const sendMessage = useCallback(
        async (textMessage, sender, currentChatId, setTextMessage) => {
            if (!textMessage) {
                return console.log('Type something');
            }

            const data = {
                chatId: currentChatId,
                senderId: sender,
                text: textMessage,
            };

            try {
                const response = await axios.post(
                    'http://localhost:5000/api/messages/createMessage',
                    data
                );

                if (response.error) {
                    return setSendMessageError(response.error);
                }

                setNewMessage(response.data);
                setMessages((prev) => [...prev, response.data]);
                setTextMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        },
        []
    );




   





    return (
        <ChatContext.Provider value={{ userChats, userChatError, getCurrentChat, messages, sendMessage, currentChat,setCurrentChat }}>
            {children}
        </ChatContext.Provider>
    );
};


