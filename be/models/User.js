import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    posts:{
      type: Array,
      default: [],
    },
    profile:{
      type: String
    },
    Cover:{
      type: String
    },
    friendRequests:{
      type: Array,
      default: [],
    },
    friends:{
      type: Array,
      default: [],
    },
    sentFriendRequest:{
      type: Array,
      default: [],
    },
    messages:{
      type: Array,
      default: [],
    },
    details:{
      type:Object,
      default:{
        From:'',
        Study:'',
        liveIn:''
      }
    },
    hobbies:{
      type:Array,
      default:[]
    },
    coverPhoto:{
      type:String,
      default:''
    },
    profilePhoto:{
      type:String,
      default:''
    },
    // userPhotos:{
    //   type:Array,
    //   default:[]
    // },
  });

const User = mongoose.model("User", userSchema);

export default User;