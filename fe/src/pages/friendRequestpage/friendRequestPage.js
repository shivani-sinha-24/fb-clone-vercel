import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './friendRequestPage.css'

const FriendRequestPage = () => {
  const userProfileData = useSelector(state=>state.loginUserDataReducer)
useEffect(()=>{
    // console.log(userProfileData);
})
  return (
    <div className='friendRequestPage'>
      friend-request
    </div>
  )
}

export default FriendRequestPage
