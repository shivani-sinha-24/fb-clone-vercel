import User from '../models/User.js'

const acceptFriendRequest = (req,res)=>{
    const {senderId,recieverId} = req.body;
    User.findOneAndUpdate({_id:recieverId},{$pull:{sentFriendRequest:senderId}},(err,user)=>{
      if(err){
        console.log(err);
       }
     })
    User.findOneAndUpdate({_id:recieverId},{$push:{friends:senderId}},(err,user)=>{
    if(err){
      console.log(err);
      }
    })
   User.findOneAndUpdate({_id:recieverId},{$push:{friends:senderId}},(err,user)=>{
     if(err){
       console.log(err);
      }else{
        res.status(200).send(user)
      }
    })
}

export default acceptFriendRequest;