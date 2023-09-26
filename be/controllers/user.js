import User from '../models/User.js'
import Post from '../models/Post.js';
import bcrypt from "bcrypt";
import aws from 'aws-sdk';
import { uploadSingleFile } from '../utils/aws-s3.js';

// // Configure AWS SDK
// aws.config.update({
//   accessKeyId: process.env.S3_API_KEY,
//   secretAccessKey: process.env.S3_SECRET_KEY,
//   region: process.env.AWS_REGION,
// });

// const formS3Params = (file, folder) => ({
//   ACL: 'public-read',
//   Bucket: process.env.S3_BUCKET_NAME,
//   Body: fs.createReadStream(file.path),
//   Key: `${folder}/${Date.now()}-${file.originalname}`,
// });


// Create an S3 instance
const s3 = new aws.S3();

const saltRounds = 10;

const register = (req, res) => {
    const { fName, lName, email, password, date, month, year, gender } = req.body;
    bcrypt.hash(password, saltRounds, function (err, hash) {
      const user = new User({
        fName: fName,
        lName: lName,
        email: email,
        password: hash,
        date: date,
        month: month,
        year: year,
        gender: gender,
      });
      User.findOne({ email: email }, (err, userFound) => {
        !userFound
          ? user.save((err) =>
              !err
                ? res.send({
                    message: "User registered successfully",
                    user: user,
                  })
                : res.send(err)
            )
          : res.send({ message: "User already exists" });
      });
    });
}

const login = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, userFound) => {
      userFound
        ? bcrypt.compare(password, userFound.password, function (err, result) {
            result
              ? res.status(201).send({
                  message: "User loggedin successfully",
                  user: userFound,
                })
              : res.send({ err: "password is incorrect" });
          })
        : res.send({ err: "User not found. Create a new account" });
    });
}

const allUsersPosts = (req, res) => {
    const id = req.params.id;
    let usersPosts = [];
    Post.find({},(err,posts)=>{
      if(posts){
        posts.map(post=>usersPosts.push(post))
        return res.status(200).send(usersPosts.reverse())
      }else {
        return res.status(500).send(err)
      }
    })
}

const checkUser = (req,res)=>{
    const {profileId} = req.body;
    User.findOne({ _id: profileId }, (err, user) =>{
      if (err) {
        return res.send({ err });
      }
      if (user) {
        const posts = user?.posts?.reverse();
        const userObj = { ...user, posts };
        res?.status(200).json(userObj);
      }
    })
}

const getUser = async (req,res)=>{
    const {profileId} = req.body;
    User.findOne({ _id: profileId }, (err, user) =>{
      if (err) {
        console.log(err)
        return res.send({ err });
      }
      if (user) {
        const posts = user?.posts?.reverse();
        const userObj = { ...user, posts };
        res?.status(200).json(userObj);
      }
    })
}

const searchUser = (req, res) => {
    const searchusertext = Object.keys(req.body);
    const userfName =(searchusertext[0].charAt(0).toUpperCase()+searchusertext[0].substring(1,searchusertext[0].length));
    User.find({ fName: userfName }, (err, usermatched) => {
      if (usermatched) {
        res.status(201).send(usermatched);
      }
    });
}

const setUserProfilePic = async (req, res) => {
  let imgFile;
  if (req?.files) {
    // imgFile = req.file.filename;
    imgFile = req?.files?.profilePhoto?.name;
  }
  const { userId } = req.body;

  if (imgFile !== undefined) {
    //image
    // Upload the file to AWS S3 using the uploadSingleFile function
    const imageUrl = await uploadSingleFile(req.files.profilePhoto, 'post-images');
    User.findOneAndUpdate(
    ({_id:userId}),
    {profilePhoto:imageUrl},
    {new: true},
    (err, user) => {
        if (err) {
          console.log("Something wrong when updating data!");
        } else {
          res.status(200).send({ status: 200, user: user });
        }
      }
    )
  }
}

const setUserCoverPic = async (req, res) => {
  let imgFile;
  if (req?.files) {
    // imgFile = req.file.filename;
    imgFile = req?.files?.coverPhoto?.name;
  }
  const { userId } = req.body;

  if (imgFile !== undefined) {
    //image
    // Upload the file to AWS S3 using the uploadSingleFile function
    const imageUrl = await uploadSingleFile(req.files.coverPhoto, 'post-images');
    User.findOneAndUpdate(
    ({_id:userId}),
    {coverPhoto:imageUrl},
    {new: true},
    (err, user) => {
      if (err) {
        console.log("Something wrong when updating data!");
      } else {
        res.status(200).send({ status: 200, user: user });
      }
    }
    )
  }
}

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

const sendFriendRequest = (req,res)=>{
    const {senderId,recieverId} = req.body;
    User.findOneAndUpdate({_id:senderId},{$push:{sentFriendRequest:recieverId}},(err,user)=>{
      if(err){
        console.log(err);
       }
     })
    User.findOneAndUpdate({_id:recieverId},{$push:{friendRequests:senderId}},(err,user)=>{
     if(err){
       console.log(err);
      }else{
        res.status(200).send(user)
      }
    })
}

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

export { login, register, getUser, searchUser, allUsersPosts, setUserProfilePic, setUserCoverPic, getUserProfilePic, sendFriendRequest, acceptFriendRequest, removeFriend, deleteFriendRequest, isAnyRequest}