import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { requestSent } from '../../reducers/friendRequestSlice'
import './usersList.css'

const UsersList = ({user}) => {
  const dispatch = useDispatch()
  const userProfileData = useSelector(state=>state.loginUserDataReducer)
  const profileUserData = useSelector(state=>state.profileUserReducer)
  const isRequestSent = useSelector(state=>state.friendRequestReducer)
  
  useEffect(()=>{
    axios.post(`http://localhost:3009/is-any-request`,reqObj)
    .then(res=>dispatch(requestSent(true)))
    .catch(()=>dispatch(requestSent(false)))
    },[])

  const sentRequest = () => {
    axios.post(`http://localhost:3009/friend-request`,reqObj)
    .then(res => dispatch(requestSent(!isRequestSent)))
    .catch(err=>console.log(err))
  }

  const deleteRequest = () => {
    axios.post(`http://localhost:3009/friend-request`,reqObj)
    .then(res=>dispatch(requestSent(!isRequestSent)))
    .catch(err=>console.log(err))
  }
  
  const reqObj = {
    senderId:userProfileData._id,
    recieverId:user._id,
  }
  return (
    <div className="found-user">
    <Link type="button" to={`/profile/${user._id}`}  className="user-info">
        <img src={user?.profilePhoto?`${user.profilePhoto}`:`http://localhost:3009/uploads/user.png`}  alt="" />
        <span>{user.fName} {user.lName}</span>
    </Link>
    <div className="buttons">
    <button onClick={()=>{isRequestSent?deleteRequest():sentRequest()}}>{isRequestSent?'Delete Request':'Add Friend'}</button>
        <Link type="button" to={`/profile/${user._id}`} > View Profile</Link>
    </div>
    </div>
  )
}

export default UsersList
