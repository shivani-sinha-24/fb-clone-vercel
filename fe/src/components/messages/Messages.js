import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Messages.css'
import Moment from 'react-moment'
import axios from 'axios'

const Messages = ({text,senderId,time}) => {
  const userProfileData = useSelector(state=>state.loginUserDataReducer)
  const [friendData,setFriendData] = useState('')

  useEffect(()=>{
    axios.get(`http://localhost:3009/user/user-pic/${senderId}`)
    .then(res=>{
      setFriendData(res.data)
    })
  },[])

  return (
    <div className={senderId==userProfileData?._id?'message own':'message'}>
      <div className="messageTop">
        <img src={friendData?.profilePhoto?`${friendData?.profilePhoto}`:`http://localhost:3009/uploads/user.png`} alt="" className="messageImg" />
        <p className="messageText">{text}</p>
      </div>
      <div className="messageMiddle">
      </div>
      <div className="messageBottom"><Moment fromNow>{time}</Moment></div>
    </div>
  )
}

export default Messages
