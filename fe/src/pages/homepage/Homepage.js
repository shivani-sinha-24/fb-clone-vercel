import React, { useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import "./Homepage.css";
import {Outlet} from "react-router-dom";
import Navbar from '../../components/navbar/Navbar';

import { addAllUsersPosts,resetAllUsersPost } from '../../reducers/allUsersPostSlice';


const Homepage = ({setIsUserLoggedin,reload,isNewPost}) => {

  const LSUser = JSON.parse(localStorage.getItem("fbUser"));

  const dispatch= useDispatch()

  const darkMode = useSelector(state=>state.themeReducer)

  useEffect(()=>{

    axios.get(`http://localhost:3009/user/users-posts/${LSUser?._id}`).then((res) => {
        dispatch(resetAllUsersPost())
        const data = res.data
        data.map(post=> dispatch(addAllUsersPosts(post._id,post.userId,post.userName,post.caption,post.image,post.date,post.likes,post.comments)))
      });

  },[reload, isNewPost])
  
  return (
    <>
      <Navbar setIsUserLoggedin={setIsUserLoggedin}/>
      <Outlet/>
    </>
  )
}

export default Homepage
