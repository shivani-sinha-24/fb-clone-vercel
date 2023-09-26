import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from "react-router-dom";
import { setDarkTheme } from '../../reducers/themeSlice';
import "./navbar.css"

const Navbar = ({setIsUserLoggedin}) => {

  const navigate= useNavigate()
  const dispatch = useDispatch();
  
  const userProfileData = useSelector(state=>state.loginUserDataReducer)
  const darkMode = useSelector(state=>state.themeReducer)

  return (
    <div className={`top-navbar one-edge-shadow ${darkMode?'darkBg' :'whiteBg'}`}>
      <div className="left-nav">
        <Link type='button' to='/' className={`${darkMode?'whiteTextColor' :'defaultTextColor'}`}>
          <span className={`${darkMode?'whiteTextColor whiteLogo' :'logo'}`}>
            facebook
          </span>
        </Link>
        <Link type='button' to='/' >
          <span className={`material-symbols-outlined ${darkMode?'whiteTextColor' :'defaultTextColor'}`}>
            home
          </span>
        </Link>
        <div className={`${darkMode?'whiteTextColor' :'defaultTextColor'}`}>
          <span className={`material-symbols-outlined ${darkMode?'whiteTextColor' :'defaultTextColor'}`} onClick={()=> dispatch(setDarkTheme(!darkMode)) }>
            dark_mode
          </span>
        </div>
        <Link type='button' to='' className={`material-symbols-outlined ${darkMode?'whiteTextColor' :'defaultTextColor'}`}>
          <span className="material-symbols-outlined">grid_view</span>
        </Link>
        {/* <div className={`search ${darkMode?'darkBg' :'whiteBg'}`}>
          <span className={`material-symbols-outlined ${darkMode?'whiteTextColor' :'defaultTextColor'}`}>search</span>
          <input type="text" className={`search-input ${darkMode?'darkBg whiteTextColor' :'whiteBg defaultTextColor'}`} name="search" id="search" placeholder='Search...'/>
        </div> */}
      </div>
      <div className="right-nav">
        <Link type='button' to='/friends' >
          <span className={`material-symbols-outlined ${darkMode?'whiteTextColor' :'defaultTextColor'}`}>
            person
          </span>
        </Link>
        <Link type='button' to='/inbox' >
          <span className={`material-symbols-outlined ${darkMode?'whiteTextColor' :'defaultTextColor'}`}>
            chat
          </span>
        </Link>
        <Link type='button' to='' >
          <span className={`material-symbols-outlined ${darkMode?'whiteTextColor' :'defaultTextColor'}`}>
            notifications
          </span>
        </Link>
        <Link type='button' to={`/profile/${userProfileData._id}`} className="user">
          <img src={userProfileData.profilePhoto?`${userProfileData.profilePhoto}`:`http://localhost:3009/uploads/user.png`} alt="user" />
          <span className={`${darkMode?'whiteTextColor' :''}`}>
            {userProfileData.fName+' '+userProfileData.lName}
          </span>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
