import React from 'react'
import Conversation from '../conversation/Conversation'
import './ChatMenu.css'

const ChatMenu = ({currentConversations}) => {
  return (
    <div className="chatMenu">
        <div className="chatMenuWrapper">
        <input type="text" placeholder='Search for Friends..' className='chatMenuInput'/>
        {currentConversations.map(conversation=><Conversation  key={conversation._id} conversation={conversation}/>)}
        </div>
    </div>
  )
}

export default ChatMenu
