import React from "react";
import { useSelector } from "react-redux";
import './newsfeed.css'
import Post from "../post/Post";
import CreatePost from "../createPost/CreatePost";
import Stories from "../stories/Stories";
import LeftBar from "../leftBar/LeftBar";
import RightBar from "../rightBar/RightBar";

const Newsfeed = ({setIsNewPost, setReload}) => {
  
  const newsFeedPosts = useSelector(state=>state.allUsersPostReducer)
  const userProfileData = useSelector(state=>state.loginUserDataReducer)
    
  return (
    <div className="homepage-flex">
          <LeftBar/>
          <div className='main-content pt-0'>
          <div
            id={userProfileData._id}
            className=" newsfeed "
          >
            {/* <Stories/> */}
            <CreatePost
              setReload={setReload}
              setIsNewPost={setIsNewPost}
            />
            {newsFeedPosts.map((post) => {
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
            })}
          </div>
        </div>
      <RightBar/>
    </div>
  );
};

export default Newsfeed;
