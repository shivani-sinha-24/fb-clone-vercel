import User from '../models/User.js'

const deleteFriendRequest = (req,res)=>{
    const {senderId,recieverId} = req.body;
    User.findOneAndUpdate({_id:senderId},{$pull:{sentFriendRequest:recieverId}},(err,user)=>{
      if(err){
        console.log(err);
      }
    })
    User.findOneAndUpdate({_id:recieverId},{$pull:{friendRequests:senderId}},(err,user)=>{
      if(err){
        console.log(err);
      }else{
        res.status(200).send(user)
      }
    })
}

export default deleteFriendRequest;