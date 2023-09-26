import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './leftBar.css'

const LeftBar = () => {
  const userProfileData = useSelector(state=>state.loginUserDataReducer)

  return (
    <div className='left-bar'>
      <div className="container">
        <div className="menu">
            <Link type='button' to={`/profile/${userProfileData._id}`} className="user">
                <img src={userProfileData.profilePhoto?`${userProfileData.profilePhoto}`:`http://localhost:3009/uploads/user.png`} alt="user" />
                <span>{userProfileData.fName+' '+userProfileData.lName}</span>
            </Link>
            <Link type='button' to='/friends' className="item">
                <span className="material-symbols-outlined">group</span>
                <span>Friends</span>
            </Link>
            <Link type='button' to=''  className="item">
                <span className="material-symbols-outlined">bookmark</span>
                <span>Saved</span>
            </Link>
            <Link type='button' to=''  className="item">
                <span className="material-symbols-outlined">groups</span>
                <span>Groups</span>
            </Link>
            <Link type='button' to=''  className="item">
                <span className="material-symbols-outlined">store</span>
                <span>Market Place</span>
            </Link>
            <Link type='button' to=''  className="item">
                <span className="material-symbols-outlined">smart_display</span>
                <span>Watch</span>
            </Link>
            <Link type='button' to=''  className="item">
                <span className="material-symbols-outlined">history</span>
                <span>Memories</span>
            </Link>
        </div>
        <hr />
        <div className="menu">
            <span className='span'>Your shortcuts</span>
            <Link type='button' to=''  className="item">
                <span className="material-symbols-outlined">event</span>
                <span>Events</span>
            </Link>
            <Link type='button' to=''  className="item">
                <span className="material-symbols-outlined">sports_esports</span>
                <span>Gaming</span>
            </Link>
            <Link type='button' to=''  className="item">
                <span className="material-symbols-outlined">photo_library</span>
                <span>Gallery</span>
            </Link>
            <Link type='button' to=''  className="item">
                <span className="material-symbols-outlined">videocam</span>
                <span>Videos</span>
            </Link>
            <Link type='button' to='/inbox'  className="item">
                <span className="material-symbols-outlined">forum</span>
                <span>Messages</span>
            </Link>
        </div>
        <hr />
        <div className="menu">
        <span className='span'>Others</span>
            <Link type='button' to=''  className="item">
                <span className="material-symbols-outlined">savings</span>
                <span>Fundraisers</span>
            </Link>
            <Link type='button' to=''  className="item">
                {/* <span className="material-symbols-coutlined">cast_for_education</span> */}
                <span className="material-symbols-outlined">cast_for_education</span>
                <span>Tutorials</span>
            </Link>
            <Link type='button' to=''  className="item">
                <span className="material-symbols-outlined">auto_stories</span>
                <span>Courses</span>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default LeftBar
