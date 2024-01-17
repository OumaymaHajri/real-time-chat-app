import { useContext, useEffect, useState } from 'react';
import { useFetchRecipient } from '../hooks/userFetchRrecipient';
import { ChatContext } from '../context/ChatContext';
import moment from 'moment';
import axios from 'axios';

export default function Conversation({ chat, user }) {

  const { recipientUser } = useFetchRecipient(chat, user);
  const firstLetter = recipientUser?.username.charAt(0).toUpperCase();
  const [lastMessage, setLastMessage] = useState(null);


  useEffect(() => {
    const fetchLastMessageForChat = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/messages/last-message/${chat?._id}`);
        setLastMessage(response.data);
      } catch (error) {
        console.error('Error fetching last message for chat:', error);
      }
    }

    fetchLastMessageForChat();
  }, [chat?._id]);


 
  return (
    <>
      <div className=' avatar-circle col-4  '>{firstLetter}</div>
      <div className="content-container " >
        <p className='text-light m-0'>{recipientUser?.username}</p>
        <row className='d-flex'>
          <small className='text-secondary m-0  truncate-text  '   >{lastMessage?.text}</small>
          <small> - </small>
           <small className='text-secondary m-0'>{moment(lastMessage?.createdAt).fromNow()}</small>

        </row>



      </div>

    </>
  )
}
