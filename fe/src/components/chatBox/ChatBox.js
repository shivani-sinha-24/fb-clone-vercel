import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Messages from '../messages/Messages'
import './ChatBox.css'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'

const ChatBox = ({reload}) => {

  const {conversationId} = useParams()
  const userProfileData = useSelector(state=>state.loginUserDataReducer)
  const [conversationFriend,setConversationFriend] = useState(null)
  const[messages,setMessages] = useState([])
  const [msg,setMsg] = useState('')
  const [friendData,setFriendData] = useState('')
  const [profileUserProfile,setProfileUserProfile]=useState('')
  const [socket,setSocket] = useState(null);
  const scrollRef = useRef()


  useEffect(() => {
    // const socket = io("http://localhost:3009", {transports: ['polling']})
    const socket = io("http://localhost:3009")
    setSocket(socket)

    socket.on("connect", () => {
        console.log("socket Connected")
        socket.emit("joinRoom", conversationId)
    })        
}, [conversationId])

  const newMsgObj = {
    conversationId:conversationId,
    senderId:userProfileData?._id,
    text:msg,
    timeofMsg: new Date()
  }

  useEffect(() => {
    if(socket){
        socket.on("getLatestMessage", (newMessage) => {
            // console.log(messages)
            // console.log(newMessage)
            setMessages([ ...messages,  newMessage ])
            scrollRef.current.scrollIntoView({behavior: "smooth"})
            setMsg("")
            // setLoading(false)
        })
    }
}, [socket, messages])

  const sendMsg = ()=>{
    socket.emit("newMessage", {newMsgObj, room: conversationId})
    axios.post(`http://localhost:3009/message`,newMsgObj)
      .then(res=>{
        setMessages([...messages,res.data])
        // setReload(true); 
        setMsg('')
      })
      .catch(err=>console.log(err))
  }

  const handleEnter = e => e.keyCode==13 ? sendMsg() : ""

  useEffect(()=>{
    axios.post(`http://localhost:3009/conversation/get-conversation-member`,{conversationId})
    .then(res=>{
      // console.log(res.data);
      const friendId =  res.data.members?.find(member=>member!==userProfileData?._id)
      axios.post(`http://localhost:3009/user/get-user`,{profileId:friendId})
      .then(res=>setConversationFriend(res.data._doc))
      .catch(err=>console.log(err))
      })
    .catch(err=>console.log(err))

    axios.get(`http://localhost:3009/user-pic/${newMsgObj.senderId}`)
    .then(res=>{
      setFriendData(res.data)})

      axios.get(`http://localhost:3009/message/${conversationId}`)
    .then(res=>{
      // console.log(conversationId);
      // console.log(res.data);
      setMessages(res.data)})
    .catch(err=>console.log(err))
  },[userProfileData?._id,conversationId,reload])

  useEffect(()=>{
    axios.get(`http://localhost:3009/message/${conversationId}`)
    .then(res=>setMessages(res.data))
    .catch(err=>console.log(err))
  },[conversationId,reload])

  useEffect(()=>{
    scrollRef?.current?.scrollIntoView({behaviour:'smooth'})
  },[messages])
  
  return (
    <div className="chatBox">
      {conversationId
      ?
      <>
        <div className="chatBoxTop">
          <div className="chatBoxTopRight">
            <Link to={`/profile/${conversationFriend?._id}`} type='button'>
          <img src={conversationFriend?.profilePhoto?`${conversationFriend?.profilePhoto}`:`http://localhost:3009/uploads/user.png`} className='chatBoxTopInboxImage' alt="" />
          <span className="chatBoxTopInboxName">{conversationFriend?.fName+' '+ conversationFriend?.lName}</span>
          </Link>
          </div>
          <Link type='button' to='/inbox' className="chatBoxTopLeft">X</Link>
        </div>
        <div className="chatBoxWrapper">
          <div className="chatBoxMiddle">
            {
            messages.length>0
            ?
              messages.map((msg,index)=>
              <div 
                ref={scrollRef}
                key={msg._id}
              >  
                <Messages 
                  text={msg.text} 
                  senderId={msg.senderId}
                  time={msg.timeofMsg}
                />
              </div>)
            :
            <div className="nomsgs" style={{height:'70vh'}}></div>
            }
          </div>
        </div>
        <div className="chatBoxBottom">
          <textarea className='chatMessageInputText' placeholder='Type a message' name="chatMessageInputText" value={msg} onChange={e=>setMsg(e.target.value)} id="chatMessageInputText"></textarea>
          <button 
            className='chatMessageSubmit' 
            onClick={()=>{sendMsg(newMsgObj)}}
            onKeyDown={(e)=>handleEnter(e)}
          >Send</button>
        </div>
      </>
      :
      <div className="noConversationChat">Open a conversation to start a chat</div>}
    </div>
  )
}

export default ChatBox
