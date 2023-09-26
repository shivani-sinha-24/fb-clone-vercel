import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Post.css" ;
import Comments from "../comments/Comments";
import { Link } from "react-router-dom";

const Post = ({ caption, image, date, postId, reload, setReload, likes, comments, postUserId, postUserName }) => {
  
  const userProfileData = useSelector(state=>state.loginUserDataReducer)
  
  const [profileUserProfile,setProfileUserProfile]=useState('')
  const [comntInput, setCmntTnput] = useState("");
  const [showCmnt, setShowCmnt] = useState(false);
  const[isPostLiked,setIsPostLikedd]= useState(false)
  const postdetail = {
    userId:userProfileData._id,
    userName:userProfileData.fName+" "+userProfileData.lName,
    postId,
    comntInput,
  };

  useEffect(()=>{
    axios.post(`http://localhost:3009/post/post-liked`,postdetail).then(res=>{
      setIsPostLikedd(true)
    })
    axios.get(`http://localhost:3009/user/user-pic/${postUserId}`)
    .then(res=>{
      setProfileUserProfile(res.data.profilePhoto)})
  },[reload])

  const deletePost = () => {
    setReload(false);
    axios.post(`http://localhost:3009/post/delete-post`, postdetail).then((res) => {
      setReload(true);
    });
  };

  const addCmnt = () => {
    setReload(false);
    if (comntInput) {
      axios
        .post(`http://localhost:3009/post/add-comment`, postdetail)
        .then((res) => {
          setReload(true);
          setCmntTnput("");
        });
    }
  };
  
  const likePost=()=>{
    setReload(false);
    axios.post(`http://localhost:3009/post/add-like`,postdetail).then(res=>{
      setIsPostLikedd(true)
      setReload(true);
    })
  }

  const dislikePost = ()=>{
    setReload(false);
    axios.post(`http://localhost:3009/post/remove-like`,postdetail).then(res=>{
      setIsPostLikedd(false)
      setReload(true);
    })
  }

  return (
    
    <div className="posts">
      <div className="post-container">
        <div className="post">
          {userProfileData._id===postUserId
          ?(
            <div className="user">
              <div className="userInfo">
                <img src={profileUserProfile?`${profileUserProfile}`:`http://localhost:3009/uploads/user.png`} alt="" />
                <div className="details">
                  <Link to={`/profile/${postUserId}`} style={{color:'inherit'}}> 
                    <span className="postUserName">{postUserName}</span>
                  </Link>
                    <span className="date">{date}</span>
                </div>
              </div>
              <span className="delete-post" onClick={() => {deletePost()}}>X</span>
            </div>
          ):(
            <div className="user">
              <div className="userInfo">
                <img src={profileUserProfile?`${profileUserProfile}`:`http://localhost:3009/uploads/user.png`} alt="" />
                <div className="details">
                  <Link to={`/profile/${postUserId}`} style={{color:'inherit'}}> 
                    <span className="postUserName">{postUserName}</span>
                  </Link>
                    <span className="date">{date}</span>
                </div>
              </div>
          </div>
          )
          }
          
          <div className="post-content">
            <p className="post-caption">{caption}</p>
            <img className="post-image"src={`${image}`} alt="" />
          </div>
          <hr />
          <div className="post-reaction">
            <div className="item btn" >
              <span className="fa fa-2x" style={isPostLiked?{color:"blue"}:{color:"black"}} onClick={()=>{isPostLiked?dislikePost():likePost()}}>&#xf087; </span>
              <span> {likes?.length?(likes.length==1?likes.length+ ' like':likes.length+ ' likes'):'0 likes'}</span>
            </div>
            <div className="item btn" onClick={() => { setShowCmnt(!showCmnt) }} >
            <span className="fa fa-2x fa-commenting-o" aria-hidden="true"></span>
              <span> {comments.length==1?comments.length+ ' comment':comments.length+ ' comments'}</span>
            </div>
          </div>
          <hr />
          <div className="comnt-form">
            <img src={userProfileData.profilePhoto?`${userProfileData.profilePhoto}`:`http://localhost:3009/uploads/user.png`} alt="" />
            <input 
              name="cmntinput"
              type="text"
              className="form-control px-3 "
              placeholder="Add comments...."
              onChange={(e) => {
                setCmntTnput(e.target.value);
              }}
              value={comntInput} 
            />
            <button 
              onClick={(e) => {
                  e.preventDefault();
                  addCmnt();
                }}
            >
              Post
            </button>
          </div>
        {showCmnt &&
          comments.length > 0 &&
          comments.map((comment) => {
            return (
              <>
              <hr />
              <Comments cmnt={comment.cmnt} postUserId={postUserId} userName={comment.userName} key={comment.by} cmntUserId={comment.by} postId={postId}setReload={setReload} />
              </>
            );
          })
        }
        </div>
       </div>
    </div>
  );
};

export default Post;
