import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import CreatePost from "../../components/createPost/CreatePost";
import Post from "../../components/post/Post";
import './profile.css'
import { addProfileUserData,resetProfileUserData } from "../../reducers/profileUserSlice";
import { requestSent } from "../../reducers/friendRequestSlice";
import { useState } from "react";

const Profile = ({reload,setReload,setIsNewPost,setIsUserLoggedin }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {profileId} = useParams()
  
  const [reqSent,setReqSent]=useState(false)

  const userProfileData = useSelector(state=>state.loginUserDataReducer)
  const profileUserData = useSelector(state=>state.profileUserReducer)
  const isRequestSent = useSelector(state=>state.friendRequestReducer)
  const [isFriend, setIsFriend] = useState(false)
  const [isFriendRequestPending,setIsFriendRequestPending] =useState(false)
  const [isFriendRequestSent, setIsFriendRequestSent] = useState(false)

  const checkForFriendStatus = ()=>{
    console.log('checkForFriendStatus called');
    if(userProfileData?._id!==profileId){ 
      console.log('profile and logged in diff');
      setIsFriend(userProfileData?.friends?.includes(profileId))
        console.log("profile user is friend of logged in user");
        // setIsFriend(true)
        setIsFriendRequestSent(userProfileData?.sentFriendRequest?.includes(profileId))
        console.log("profile user has friend request  of logged in user");

        // setIsFriendRequestPending(true)
        console.log("logged in user sent request to profile user");

        setIsFriendRequestSent(userProfileData?.friendRequests?.includes(profileId))
        // setIsFriendRequestSent(true)

      }
    }
  
  const reqObj = {
    senderId:userProfileData._id,
    recieverId:profileId,
  }


  useEffect(()=>{
    dispatch(resetProfileUserData())
    axios.post(`http://localhost:3009/user/get-user`,{profileId})
    .then((res) => {
      setReload(true)
      const data = res.data;
      dispatch(addProfileUserData(
        res.data._doc._id,
        res.data._doc.fName,
        res.data._doc.lName,
        res.data._doc.email,
        res.data._doc.date,
        res.data._doc.month,
        res.data._doc.year,
        res.data._doc.posts,
        res.data._doc.gender,
        res.data._doc.friendRequests,
        res.data._doc.details,
        res.data._doc.friends,
        res.data._doc.profilePhoto,
        res.data._doc.coverPhoto,
        res.data._doc.hobbies,
        res.data._doc.messages
      ))
    })
  },[profileId,reload])

  useEffect(()=>{
    axios.post(`http://localhost:3009/profile/is-any-request`,reqObj)
    .then(res=>dispatch(requestSent(true)))
    .catch(()=>dispatch(requestSent(false)))  
    // checkForFriendStatus()  
    },[profileId,reload])

  useEffect(()=>{
    userProfileData?.friendRequests?.length>0?userProfileData.friendRequests.map(req=>{
      console.log(' friend req');
      setIsFriendRequestPending(true)
      return(req===profileUserData?._id)
    }):console.log('no friend req');;
  },[profileId,reload])

  const changeProfilePic = async (e) => {
    setReload(false)  
    const config = {headers:{"Content-Type":"multipart/form-data"}};
    await axios.post(`http://localhost:3009/user/change-profile-photo`,({ userId:userProfileData?._id, [e.target.name]:  e.target.files[0] }),config)
    .then(res=>{
      setReload(true);
      console.log(res)})
    .catch(err=>console.log(err))
  };
  
  const changeCoverPic =async (e) => {
    setReload(false)
    const config = {headers:{"Content-Type":"multipart/form-data"}};
    await axios.post(`http://localhost:3009/user/change-cover-photo`,({ userId:userProfileData?._id, [e.target.name]:  e.target.files[0] }),config)
    .then(res=>{
      setReload(true);
      console.log(res)})
    .catch(err=>console.log(err))
  };

  const sentRequest = () => {
    axios.post(`http://localhost:3009/user/send-friend-request`,reqObj)
    .then(res => dispatch(requestSent(!isRequestSent)))
    .catch(err=>console.log(err))
  }

  const deleteRequest = () => {
    axios.post(`http://localhost:3009/user/delete-friend-request`,reqObj)
    .then(res=>dispatch(requestSent(!isRequestSent)))
    .catch(err=>console.log(err))
  }

  const acceptRequest = ()=>{

  }

  const removeFriend = ()=>{
    
  }
  const createNewConversation = ()=>{
  console.log(reqObj);

    axios.post(`http://localhost:3009/conversation/add-conversation`,reqObj)
    .then(res=>{
      console.log(res.data._id)
      navigate(`../direct/${res.data._id}`, { replace: true })

    })
    .catch(err=>console.log(err))
  }

  const userLogout = ()=>{localStorage.clear();setIsUserLoggedin(false);navigate("../login", { replace: true })};

  return (
    <div className="profile">
      <div className="images">
        <div className="cover-pic-container">
          <img src={profileUserData.coverPhoto?`${profileUserData.coverPhoto}`:`http://localhost:3009/uploads/user.png`} alt="" className="cover-pic"/>
          {profileUserData._id===userProfileData._id
          ?
          <form method="post" className="cover-pic-form" encType="multipart/form-data">
            <label htmlFor="coverPhoto">
            <span className="material-symbols-outlined edit-cover">
              photo_camera
            </span>
            </label>
            <input
              type="file"
              name="coverPhoto"
              id="coverPhoto"
              // value={post.image}
              accept=".png, .jpg, .jpeg"
              onChange={changeCoverPic}
              style={{ display: "none" }}
            />
          </form>
          :
          null
          }
        </div>
        <div className="profile-pic-conatiner">
          <img src={profileUserData.profilePhoto?`${profileUserData.profilePhoto}`:`http://localhost:3009/uploads/user.png`} alt="" className="profile-pic"/>
          {profileUserData._id===userProfileData._id
          ?
          <form method="post" className="profile-pic-form" encType="multipart/form-data">
            <label htmlFor="profilePhoto">
            <span className="material-symbols-outlined edit-profile">
              photo_camera
            </span>
            </label>
            <input
              type="file"
              name="profilePhoto"
              id="profilePhoto"
              // value={post.image}
              accept=".png, .jpg, .jpeg"
              onChange={changeProfilePic}
              style={{ display: "none" }}
            />
          </form>
          :
          null
          }
        </div>
      </div>
      <div className="profile-container-top">
        <div className="user-info">
          <div className="left">
          <div className="info">
              <div className="item">
                <span className="material-symbols-outlined">
                  location_on  
                </span>
                <span> From {profileUserData?.details?.From}</span>
              </div>
              <div className="item">
                <span className="material-symbols-outlined">
                  school 
                </span>
                <span> Studied at {profileUserData?.details?.Study}</span>
              </div>
              <div className="item">
                <span className="material-symbols-outlined">
                  house 
                </span>
                <span> Lives in {profileUserData?.details?.LiveIn}</span>
              </div>
            </div>
          </div>
          <div className="center">
            <span>
              {`${profileUserData.fName} ${profileUserData.lName}`}
            </span>
            {profileId===userProfileData._id?
              <button>Edit</button>
            :
              (
                <button onClick={()=>{isRequestSent
                  ?deleteRequest()
                  :
                    isFriendRequestPending
                    ? acceptRequest()
                    :
                      sentRequest()}}>
                  {isRequestSent?'Delete Request':isFriendRequestPending?'Accept Request':'Add Friend'}</button>
              )
            }
          </div>
          <div className="right">
          {profileId===userProfileData._id
            ?
              <button style={{padding:'10px 20px',color:'white',backgroundColor:'red',border:'none',display:'flex'}} onClick={()=>{userLogout()}}>
                <span className="material-symbols-outlined">
                logout
                </span>
                Logout
              </button>
            :
              <button onClick={()=>createNewConversation()}  style={{padding:'10px 20px',color:'white',backgroundColor:'#5271ff',border:'none',display:'flex'}}>  
                <span className="material-symbols-outlined">
                  mail
                  </span>
                  Message
              </button>
            }
          </div>
        </div>
      </div>
      <div className="profile-container-bottom">
        <div className="profile-container-bottom-left">
          <div className="item">
            <div className="intro">
              <span>Intro</span>
            </div>
          </div>
          <div className="item">
            <div className="details">
              <span>Details</span>
              <div className="detail">
                <span className="material-symbols-outlined">
                  location_on  
                </span>
                <span> From {profileUserData?.details?.From}</span>
              </div>
              <div className="detail">
                <span className="material-symbols-outlined">
                  school 
                </span>
                <span> Studied at {profileUserData?.details?.Study}</span>
              </div>
              <div className="detail">
                <span className="material-symbols-outlined">
                  house 
                </span>
                <span> Lives in {profileUserData?.details?.LiveIn}</span>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="hobbies">
              <span>Hobbies</span>
            </div>
          </div>
        </div>
        <div className="profile-container-bottom-right ">
          {profileId===userProfileData._id
            ?
              <CreatePost
              setReload={setReload}
              setIsNewPost={setIsNewPost}
              />
            : null
          }
          {profileUserData?.posts?.length>0
          ?
            profileUserData.posts.map((post) => {
              return (              
                <Post
                key={post._id}
                postUserId={post.userId}
                postUserName={post.userName}
                setReload={setReload}
                postId={post._id}
                date={post.date}
                caption={post.caption}
                image={post.image}
                comments={post.comments}
                likes={post.likes}
                />
              );
            })
          :
            <div className="no-post-container p-2 bg-light">
              {profileUserData._id===userProfileData._id
                ?
                  <span>Nothing to show here. Create post to show.</span>
                :
                  <span>Nothing to show here. {profileUserData.fName+' '+profileUserData.lName + ' did not posted anything yet. Once the user post anything you can see it here.'}</span>
              }
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Profile;
