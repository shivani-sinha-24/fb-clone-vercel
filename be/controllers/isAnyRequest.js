import User from '../models/User.js'

const isAnyRequest = (req,res)=>{
    const {senderId,recieverId} = req.body;
    User.findOne({_id:recieverId},(err,user)=>{
      if(user){
          if(user.friendRequests.includes(senderId)){
            res.status(200).send(user)
          }else{
            res.status(400).send(err)
          }
      }else{
        console.log(err);
      }
    })
}

export default isAnyRequest;