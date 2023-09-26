import React from 'react'
import './FriendRequest.css'

const FriendRequest = ({friendRequests}) => {
  return (
    <div className='friendrequest'>
      <h3>Friend Request</h3>
      {friendRequests.map(request=>{
        return(
          <div>
            <h5>{request}</h5>
          </ div>
        )
      })}
    </div>
  )
}

export default FriendRequest
