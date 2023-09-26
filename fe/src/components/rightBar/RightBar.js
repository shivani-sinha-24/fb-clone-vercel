import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './rightBar.css'

const RightBar = () => {
  const userProfileData = useSelector(state=>state.loginUserDataReducer)

  return (
    <div className='right-bar'>
      <div className="container">
        <div className="item">
            <span>Suggestions for You</span>
            <div className="user">
                <div className="user-info">
                    <img src="https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <span>Prince Raj</span>
                </div>
                <div className="buttons">
                    <button>follow</button>
                    <button>dismiss</button>
                </div>
            </div>
            <div className="user">
                <div className="user-info">
                    <img src="https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <span>Prince Raj</span>
                </div>
                <div className="buttons">
                    <button>follow</button>
                    <button>dismiss</button>
                </div>
            </div>
        </div>
        <div className="item">
            <span>Latest Activities</span>
            <div className="user">
                <div className="user-info">
                    <img src="https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <p>
                    <span>Prince Raj</span> Changed their cover picture
                    </p>
                </div>
                <span style={{color:'grey'}}>1 min ago</span>
            </div>
            <div className="user">
                <div className="user-info">
                    <img src="https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <p>
                    <span>Prince Raj</span> Changed their cover picture
                    </p>
                </div>
                <span style={{color:'grey'}}>1 min ago</span>
            </div>
            <div className="user">
                <div className="user-info">
                    <img src="https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <p>
                    <span>Prince Raj</span> Changed their cover picture
                    </p>
                </div>
                <span style={{color:'grey'}}>1 min ago</span>
            </div>
            <div className="user">
                <div className="user-info">
                    <img src="https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <p>
                    <span>Prince Raj</span> Changed their cover picture
                    </p>
                </div>
                <span style={{color:'grey'}}>1 min ago</span>
            </div>
            <div className="user">
                <div className="user-info">
                    <img src="https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <p>
                    <span>Prince Raj</span> Changed their cover picture
                    </p>
                </div>
                <span style={{color:'grey'}}>1 min ago</span>
            </div>
        </div>
        <div className="item">
            <span>Online Friends</span>
            <div className="user">
                <div className="user-info">
                    <img src="https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <div className="online"></div>
                    <span>Prince Raj</span> 
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default RightBar
