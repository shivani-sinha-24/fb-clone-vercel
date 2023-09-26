import React, { useState } from 'react'
import axios from 'axios';
import './friendspage.css'
import UsersList from '../../components/usersList/UsersList';
import SearchUserForm from '../../components/searchUserFrom/SearchUserForm';
import { Link, Outlet } from 'react-router-dom';
import LeftBar from '../../components/leftBar/LeftBar'
import FriendRequest from '../../components/friendRequest/FriendRequest';
import FriendSuggestion from '../../components/friendSuggestion/FriendSuggestion';
import FriendList from '../../components/friendList/FriendList';
import { useSelector } from 'react-redux';

const Friends = () => {
  const [searchInput,setSearchInput]=useState("");
  const[usersList,setUsersList]=useState([])
  const userProfileData = useSelector(state=>state.loginUserDataReducer)

  const friendRequests = userProfileData.friendRequests;
  const friends = userProfileData.friends;
  const sentFriendRequest = userProfileData.sentFriendRequest;

  const findUsers = e =>{
    e.preventDefault()
    axios.post(`http://localhost:3009/user/search-user`,searchInput).then(res=>{
      setUsersList(res.data);
      // console.log(res.data);
    })
  }

  return (
    <div className="friendpage-flex">
      <LeftBar/>
      <div className='main-content px-4'>
        <div className="top">
          <div className="container shadow justify-content-center my-3 border-style">
            <SearchUserForm 
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              usersList={usersList}
              setUsersList={setUsersList}
              findUsers={findUsers}
            />
          </div>
          <div className="found-users-list m-2">
            {usersList.length>0&&(
              <div className="users">
              {usersList.map(user=>{return(
                <UsersList key={user._id} user={user}/>
                )
              })}
              </div>
            )}
          </div>
        </div>
        <div className="bottom">
          <FriendList friends={friends}/>
          <FriendRequest friendRequests={friendRequests}/>
          <FriendSuggestion />
        </div>
      </div>
    </div>
  )
}

export default Friends
