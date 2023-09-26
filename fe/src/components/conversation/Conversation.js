import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Conversation.css'

const Conversation = ({conversation}) => {
  const userProfileData = useSelector(state=>state.loginUserDataReducer)
  const [conFriend,setConFriend] = useState(null)
  
  useEffect(()=>{
    const friendId = conversation.members.find(member=>member!==userProfileData?._id)
    console.log(friendId);
    axios.post(`http://localhost:3009/user/get-user`,{profileId:friendId})
    .then(res=>setConFriend(res.data._doc))
    .catch(err=>console.log(err))
  },[])

  return (
    <Link type="button" to={`/direct/${conversation._id}`} className='conversation'>
      <img src={conFriend?.profilePhoto?`${conFriend.profilePhoto}`:`http://localhost:3009/uploads/user.png`} className='conversationImage' alt="" />
      <span className="converationName">{conFriend?.fName+' '+ conFriend?.lName}</span>
    </Link>
  )
}

export default Conversation
