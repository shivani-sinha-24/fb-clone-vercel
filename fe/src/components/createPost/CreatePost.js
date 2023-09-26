import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./createPost.css";
import axios from 'axios';
import moment from 'moment';

const CreatePost = ({setIsNewPost,setReload}) => {
  const userProfileData = useSelector(state=>state.loginUserDataReducer)
  
  const[post,setPost]=useState({
    userId:userProfileData._id,
    userName:userProfileData.fName+" "+userProfileData.lName,
    caption:"",
    image:"",
    date:moment().format('MMMM Do YYYY')
    // date:moment().format('MMMM Do YYYY, h:mm:ss a')
    // date:new Date()
  });
  const [file, setFile] = useState("");
  const [fileDataURL, setFileDataURL] = useState(null);
  const changeHandler = (e) => {
    const {name} = e.target;
    setFile( e.target.files[0]);  
    // console.log(file);
    setPost({ ...post, [name]:  e.target.files[0] });
  };
  const changeHandle=(e)=>{
    const {name,value} = e.target;;
    setPost({ ...post, [name]: value });
  }
  useEffect(() => {
    let fileReader,
    isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]); 
  const deleteImg = (e)=>{
    e.preventDefault()
    setPost({ ...post, image: "" });
    setFileDataURL(null)
  }
  
  const createPost=async(e)=>{
    e.preventDefault();
    setReload(false)
    const config = {headers:{"Content-Type":"multipart/form-data"}}
    await axios.post("http://localhost:3009/post/addPost",post,config)
    .then(res=>{
      setReload(true)
      setFileDataURL(null)
      setPost({...post,
        caption:"",
        image:"",})
    }) 
    .catch(err=>console.log(err))
  }
  return (
    <div className="create-post shadow container p-3">
      <form method="post" className="post-form" encType="multipart/form-data">
        <div className="post-form-top">
          <div className="post-form-left-img">
            <img src={userProfileData.profilePhoto?`${userProfileData.profilePhoto}`:`http://localhost:3009/uploads/user.png`} style={{height:"40px",width:'40px', borderRadius: '50%',objectFit:'cover'}} alt="" />
          </div>
        <div className="post-form-center">
          <input
          style={{
            border:"none",
            fontSize:"large",
            backgroundColor:"lightgray"
          }}
            className=" caption form-control"
            type="text"
            name="caption"
            id="caption"
            value={post.caption}
            placeholder={"Whats on your mind, "+userProfileData.fName+"?"}
            onChange={changeHandle}
          />
        </div>
        <div className= "post-form-right">
            <label htmlFor="image" className=" text-center">
              <span className=" text-center  material-symbols-outlined">
                add_a_photo
              </span>
              Photos
            </label>
            <input
              type="file"
              name="image"
              id="image"
              // value={post.image}
              accept=".png, .jpg, .jpeg"
              onChange={changeHandler}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="card" style={{padding:'0', border:'none'}}>
          {fileDataURL ? (
            <div className=" p-3" style={{height:"fit-content",border:"none",zIndex:'1'}}>
              <div className=" card justify-content-center">
                <button onClick={deleteImg} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                X{/* &#x2715; */}
                </button>
                <img
                  src={fileDataURL}
                  alt="preview"
                  style={{
                    width: "100%",
                    maxHeight: "500px",
                    border:"none",
                    objectFit:"cover"
                  }}
                />
            </div>
            </div>
          ) : null}
        </div>
        <input 
          className="form-control"
          type='text'
          // defaultValue={moment().format('MMMM Do YYYY, h:mm a')} 
          defaultValue={new Date()}
          name='date' 
          style={{display:"none"}}
          ></input>
        <div className="d-grid gap-2 mt-2 btn btn-primary" onClick={createPost}>
            Post
          </div>
      </form>
   </div>
  );
};

export default CreatePost;
