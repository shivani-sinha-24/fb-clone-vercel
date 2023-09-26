import User from '../models/User.js';

const getUserProfilePic = (req,res)=>{
    const {userId} = req.params;
    User.findOne({_id:userId},(err,user)=>{
      if(user){
        res.status(200).send(user)
      }else{
        console.log(err)
      }
    })
}

export default getUserProfilePic;