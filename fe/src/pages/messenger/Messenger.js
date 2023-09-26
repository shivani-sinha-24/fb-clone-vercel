import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import './Messenger.css'
import { useParams } from 'react-router-dom'

import ChatBox from '../../components/chatBox/ChatBox'
import ChatMenu from '../../components/chatMenu/ChatMenu'
import ChatOnline from '../../components/ChatOnline/ChatOnline'
import { io } from 'socket.io-client';

const Messenger = ({reload,setReload}) => {

  const {conversationId} = useParams()  
  const userProfileData = useSelector(state=>state.loginUserDataReducer)
  const[messages,setMessages] = useState([])
  const [arrivalMessage,setArrivalMessage] = useState(null)
  const [currentConversations,setCurrentConversation] = useState([])
  const scrollRef = useRef()


  useEffect(()=>{
    const getConversations = async()=>{
      await axios.post(`http://localhost:3009/conversation`,{userId:userProfileData?._id})
      .then(res=>setCurrentConversation(res.data))
      .catch(()=>console.log(false))
    }
    getConversations()
   
  },[userProfileData._id]);

  return (
    <div className="messenger">
      <ChatMenu 
        currentConversations={currentConversations}
      />
      <ChatBox 
        conversationId={conversationId}
        currentConversations={currentConversations}
        reload={reload}
        messages={messages}
        setMessages={setMessages}
        setReload={setReload}
        scrollRef={scrollRef}
      />
      <ChatOnline/>
    </div>
  )
}

export default Messenger
