import React from 'react'
import { useSelector } from 'react-redux'
import './stories.css'

const Stories = () => {
  const userProfileData = useSelector(state=>state.loginUserDataReducer)

    const stories = [
        {
            id:1,
            name:'Prince Raj',
            image:'https://images.pexels.com/photos/1374067/pexels-photo-1374067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id:2,
            name:'Prince Raj',
            image:'https://images.pexels.com/photos/1740896/pexels-photo-1740896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id:3,
            name:'Prince Raj',
            image:'https://images.pexels.com/photos/1374067/pexels-photo-1374067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id:4,
            name:'Prince Raj',
            image:'https://images.pexels.com/photos/1740896/pexels-photo-1740896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
    ]
  return (
    <div className='stories'>
        <div className="story">
            <img src={`https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}alt="" />
            <span>{`${userProfileData.fName} ${userProfileData.lName}`}</span>
            <button>+</button>
        </div>
        {stories.map(story=>{
            return(
                <div key={story.id} className="story">
                    <img src={story.image}alt="" />
                    <span>{story.name}</span>
                </div>
            )
        })
        }
    </div>
  )
}

export default Stories
