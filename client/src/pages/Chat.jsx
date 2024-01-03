import React, { useContext, useEffect, useState } from 'react'

import { Container, Row } from 'react-bootstrap'
import Conversation from '../components/Conversation'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext';
import Messages from '../components/Messages';
import axios from 'axios';
import UsersSearchResults from '../components/UsersSearchResults';

export default function Chat() {



  const { userChats, getCurrentChat } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const { currentChat,setCurrentChat } = useContext(ChatContext);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    setCurrentChat(null);
    
  },[]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/getUsers/${searchText}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (searchText.trim() !== '') {
      fetchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchText]);


  const getTempChat = async (recipient) => {
    try {
      setSearchText("");
      setSearchResults([]);

 
      const data = {
        firstId: user?._id,
        secondId: recipient?._id,
     };
      const response = await axios.post('http://localhost:5000/api/chat/CreateChat',  data);
      getCurrentChat(response.data);
      userChats();
     
      
    } catch (error) {
      console.error('Error checking chat existence:', error);
    }

  };


  return (
    <Row>
      <div className='col-lg-4 col-md-4 col-sm-3' >
        <Container className="side-chat">


          <div className="input-wrapper">
            <input placeholder="Search username..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)} />
            <div></div>

          </div>


          {userChats && userChats.length && searchText == "" > 0 ? (
            userChats.map((chat, index) => (

              <div className='conversation-wrapper' key={index} onClick={() => getCurrentChat(chat)}>
                <div className='conversation' style={{
                  background: chat?._id === currentChat?._id ? '#353535' : 'transparent',
                }}>
                  <Conversation chat={chat} user={user} />
                </div>
              </div>

            ))
          ) : (



            searchResults.map((user, index) => (

              <div className='conversation-wrapper' key={index}  onClick={() => getTempChat(user)} >
                <div className='conversation'  >
                  <UsersSearchResults   user={user}  />
                </div>
              </div>
            ))

          )}
        </Container>

      </div>

      <div className='col-lg-8 col-md-8 col-sm-9' >
        <Container className="chat-box ">

          {currentChat?  <Messages /> : (
            <div  className='text-white  text-center'>
              <h6  className='text-secondary  '>No chat is selected</h6>
            </div>

          )}

         

        </Container>
      </div>
    </Row >


  )
}

