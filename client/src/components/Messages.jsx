import React, { useContext, useEffect, useRef, useState } from 'react'
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { useFetchRecipient } from '../hooks/userFetchRrecipient';
import moment from 'moment';

export default function Messages() {
    const { messages, sendMessage, getCurrentChat, currentChat } = useContext(ChatContext);
    const { user } = useContext(AuthContext);
    const [textMessage, setTextMessage] = useState("");
    const { recipientUser } = useFetchRecipient(currentChat, user);

    const currentUser = user?._id;
    const messagesRef = useRef();

    // Scroll to bottom function
    const scrollToBottom = () => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    };

    // Scroll to bottom when messages change
    useEffect(() => {
        if (currentChat)
            scrollToBottom();
    }, [messages]);



    const handleTextChange = (e) => {
        setTextMessage(e.target.value);
    };

  


    return currentChat ? (

        <div className='chat-box'>
            <div className='chat-box-header'>
                <p className='mb-0'>{recipientUser?.username}</p></div>
            <div style={{ height: "100%", overflowY: 'auto', }} ref={messagesRef}>

                {messages && messages.length > 0 ? (
                    messages.map((message, index) => (

                        <div key={index}
                            className={`message-container flex-column    ${currentUser == message?.senderId ? 'd-flex align-items-end  ' : 'd-flex align-items-start'}`}>

                            <div className='message-content flex-column  '>

                                <p className='text-light m-0'>{message?.text} </p>
                            </div>



                        </div>

                    ))
                ) : (
                    <div className='d-flex justify-content-center'>


                    </div>
                )}
            </div>
            <div className=' chat-box-footer'>
                <input className='message-input'
                    value={textMessage}
                    onChange={handleTextChange} />
                <button onClick={() => sendMessage(textMessage, currentUser, currentChat._id, setTextMessage)}
                    className='send-button'
                >  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                    </svg>
                </button>
            </div>


        </div>


    ) : null;
}
