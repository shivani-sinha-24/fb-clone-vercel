import User from '../models/User.js'

const removeFriend = (req,res)=>{
    const {senderId,recieverId} = req.body;
    User.findOneAndUpdate({_id:senderId},{$push:{friends:recieverId}},(err,user)=>{
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

export default removeFriend;