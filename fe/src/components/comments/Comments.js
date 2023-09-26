import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './comments.css'
import { useEffect } from 'react';

const Comments = ({cmnt,setReload,postId,userName,cmntUserId,postUserId}) => {
  const userProfileData = useSelector(state=>state.loginUserDataReducer)
  const profileUserData = useSelector(state=>state.profileUserReducer)
  const [cmntUserProfile,setCmntUserProfile]=useState('')

  console.log(profileUserData._id,userProfileData._id,postUserId,cmntUserId)

  useEffect(()=>{
    axios.get(`http://localhost:3009/user/user-pic/${cmntUserId}`)
    .then(res=>setCmntUserProfile(res.data.profilePhoto))
  },[])
  
  const cmntDetail = {
    userId:cmntUserId,
    cmnt,
    userName:userName,
    postId
  }

   const deleteCmnt = ()=>{
    setReload(false);
    axios.post(`http://localhost:3009/post/delete-comment`,cmntDetail).then(res=>{
      setReload(true);
    })
  }

  return (
    <div className="comment">
      <div className="comment-detail">
        <img src={cmntUserProfile?`${cmntUserProfile}`:`http://localhost:3009/uploads/user.png`} alt="" />
        <div className="info">
          <span>{userName}</span>
          <p>{cmnt}</p>
        </div>
      </div>
      {
      postUserId===userProfileData._id
      ?
        <div className="comment-delete btn" onClick={()=>{deleteCmnt()}}>
        <span className=" fa fa-2x  text-primary fa-trash"></span>
        </div>
      : 
        (userProfileData._id===cmntUserId
        ?
          <div className="comment-delete btn" onClick={()=>{deleteCmnt()}}>
          <span className=" fa fa-2x  text-primary fa-trash"></span>
          </div>
        : null)
      }
    </div>
  )
}

export default Comments
