import { useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

import "./App.css";

import Login from "./pages/loginPage/Login";
import NewAccount from "./pages/newAccountpage/NewAccount";
import Homepage from "./pages/homepage/Homepage";
import Profile from "./pages/profile/Profile"
import Messenger from "./pages/messenger/Messenger";
import Friends from "./pages/friendspage/Friendspage";
import FriendRequestPage from "./pages/friendRequestpage/friendRequestPage";

import { addLoginUserData } from "./reducers/loginUserDataSlice";

import Newsfeed from "./components/newsfeed/Newsfeed";

function App() {
  const dispatch = useDispatch()
  const userProfileData = useSelector(state=>state.loginUserDataReducer)

  const [isUserLoggedin, setIsUserLoggedin] = useState(false);  
  const [reload, setReload] = useState(false);

  const LSUser = JSON.parse(localStorage.getItem("fbUser"));

  // useEffect(()=>{LSUser?setIsUserLoggedin(true):setIsUserLoggedin(false)},[LSUser])

  useEffect(()=>{
    if(LSUser){
      // console.log(LSUser)
      axios.post(`http://localhost:3009/user/get-user`,{profileId:LSUser._id}).then(res=>{
      setIsUserLoggedin(true)
      dispatch(addLoginUserData(
        res.data._doc._id,
        res.data._doc.fName,
        res.data._doc.lName,
        res.data._doc.email,
        res.data._doc.date,
        res.data._doc.month,
        res.data._doc.year,
        res.data._doc.posts,
        res.data._doc.gender,
        res.data._doc.friendRequests,
        res.data._doc.details,
        res.data._doc.friends,
        res.data._doc.profilePhoto,
        res.data._doc.coverPhoto,
        res.data._doc.hobbies,
        res.data._doc.messages,
        res.data._doc.sentFriendRequest
        ))
      })
    }else{
      setIsUserLoggedin(false)
    }
  },[reload])
  
  return (
    <BrowserRouter>
      <Routes>
          <Route
            path="login"
            element={
              <Login
                isUserLoggedin={isUserLoggedin}
                setIsUserLoggedin={setIsUserLoggedin}
              />
            }
          />
          <Route
            path="new-account"
            element={
              <NewAccount
                isUserLoggedin={isUserLoggedin}
                setIsUserLoggedin={setIsUserLoggedin}
              />
            }
          />
          <Route path="/"element={
              isUserLoggedin? (
              <Homepage
              reload={reload}
                setReload={setReload}
                setIsUserLoggedin={setIsUserLoggedin}
              />
            ):<Login
                isUserLoggedin={isUserLoggedin}
                setIsUserLoggedin={setIsUserLoggedin}
              />}
          >
            <Route path="/" element={
              <Newsfeed
                isUserLoggedin={isUserLoggedin}
                reload={reload}
                setReload={setReload}
              />}
            />
            <Route path={`profile/:profileId`} element={
              <Profile
                isUserLoggedin={isUserLoggedin}
                reload={reload}
                setReload={setReload}
                setIsUserLoggedin={setIsUserLoggedin}
              />}
            />
            <Route path={`/:id`} element={<Profile/>}/>
            <Route path="inbox" element={
            <Messenger
              reload={reload}
              setReload={setReload}
            />
            }/>
            <Route path="direct/:conversationId" element={
            <Messenger
              reload={reload}
              setReload={setReload}
            />
            }/>
            <Route path="friends" element={<Friends/>}>
              <Route path="suggestion" element={<h1>suggestion page</h1> }/>
              <Route path="request" element={<FriendRequestPage/> }/>
              <Route path="" element={<h1>friends page</h1> }/>
              <Route path="search" element={<h1>search page</h1> }/>
              {/* need to work to add outlet feature in friends component */}
            </Route>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;