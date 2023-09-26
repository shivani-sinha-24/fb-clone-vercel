import Post from '../models/Post.js';
import User from '../models/User.js';
import aws from 'aws-sdk';
import { uploadSingleFile } from '../utils/aws-s3.js';

// Configure AWS SDK
aws.config.update({
  accessKeyId: process.env.S3_API_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const formS3Params = (file, folder) => ({
  ACL: 'public-read',
  Bucket: process.env.S3_BUCKET_NAME,
  Body: fs.createReadStream(file.path),
  Key: `${folder}/${Date.now()}-${file.originalname}`,
});


// Create an S3 instance
const s3 = new aws.S3();

const post = async(req, res) => {
  
    let imgFile;
    if (req?.files) {
      // imgFile = req.file.filename;
      imgFile = req?.files?.image?.name;
    }

    const { caption, date, userId,userName } = req.body;
    if (imgFile === undefined && caption == "") {
      //no image no caption
      res.status(401).send({ status: 401, message: "fill the data" });
    } else {
      let post;
      if (imgFile !== undefined && caption == "") {
        //image but no caption
      // Upload the file to AWS S3 using the uploadSingleFile function
      const file = req.files.image; // This should match the name attribute in your HTML form
      const imageUrl = await uploadSingleFile(file, 'post-images');

      // const params = {
      //   ACL: 'public-read',
      //   Bucket: process.env.S3_BUCKET_NAME,
      //   Key: file.name,
      //   Body: file.data,
      // };
    
      // // Upload the file to S3
      // s3.upload(params, (err, data) => {
      //   if (err) {
      //     return res.status(500).send(err);
      //   }
        
      //   // Construct the S3 URL based on your bucket and the uploaded file's key
      //   const s3Url = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
        
      //   // Send the S3 URL as the response
      //   console.log(`File uploaded to S3 successfully. URL: ${s3Url}`);
      // });
        post = new Post({
          userId:userId,
          userName:userName,
          image: imageUrl,
          date: date,
        });
        post.save();
      } else if (imgFile === undefined && caption !== "") {
        // no img but caption
        post = new Post({
          userId:userId,
          userName:userName,
          caption: caption,
          date: date,
        });
        post.save();
      } else {
        // both image and caption
      // Upload the file to AWS S3 using the uploadSingleFile function
      const file = req.files.image; // This should match the name attribute in your HTML form
      const imageUrl = await uploadSingleFile(file, 'post-images');

      // const params = {
      //   ACL: 'public-read',
      //   Bucket: process.env.S3_BUCKET_NAME,
      //   Key: file.name,
      //   Body: file.data,
      // };
    
      // // Upload the file to S3
      // s3.upload(params, (err, data) => {
      //   if (err) {
      //     return res.status(500).send(err);
      //   }
        
      //   // Construct the S3 URL based on your bucket and the uploaded file's key
      //   const s3Url = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
        
      //   // Send the S3 URL as the response
      //   console.log(`File uploaded to S3 successfully. URL: ${s3Url}`);
      // });
        post = new Post({
          userId:userId,
          userName:userName,
          caption: caption,
          image: imageUrl,
          date: date,
        });
        post.save();
      }
      User.findOneAndUpdate(
        { _id: userId },
        { $push: { posts: post } },
        { new: true },
        (err, user) => {
          if (err) {
            console.log("Something wrong when updating data!");
            console.error("Error creating post:", err);
          } else {
            res.status(201).send({ status: 201, user: user });
          }
        }
      );
    }
}

// const post = ('/upload', (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }

//   const file = req.files.image; // This should match the name attribute in your HTML form

//   awsUpload(file)
  
// });


const deletePost = (req, res) => {
    const { postId, userId } = req.body;
    Post.findOneAndDelete({_id: postId }, function (err, docs) {
      if (err){
          // console.log(err)
      }
      else{
          // console.log("Deleted User : ");
      }
      Post.find({userId:userId},(err,posts)=>{
        if(err){
          console.log(err)
        }else{
          User.findOneAndUpdate({_id:userId},{"$set": { posts: posts }},(err,user)=>{
            if(err){
              console.log(err);
            }else{
              res.send(user)
            }
          })
        }
      })
    });
    
}

const postLiked = (req,res)=>{
    const {userId,postId} = req.body;
    Post.findOne({_id:postId},(err,post)=>{
      if(post){
        setTimeout(() => {
          
          if(post.likes.includes(userId)){
            res.status(200).send(post)
          }else{
            res.status(400).send(err)
          }
        }, 10);
      }else{
        console.log(err);
      }
    })
}

const addLike = (req,res)=>{
    let userPosts, postsUserId;
    const {userId,postId}=req.body;
    Post.findOneAndUpdate({_id:postId},{ $push: { likes: userId} },(err,post)=>{
      if(!post){
        console.log(err);
      }else{
        postsUserId=post.userId
      }
      Post.find({userId:postsUserId},(err,posts)=>{
        if(posts){
          User.findOneAndUpdate({_id:postsUserId},{"$set": { posts: posts }},(err,user)=>{
            if(err){
              console.log(err);
            }else{
              res.send(user)
            }
          })
        }else{
          console.log(err);
        }
      })
    })
}

const removeLike = (req,res)=>{
    let userPosts, postsUserId;
    const {userId,postId}=req.body;
    Post.findOneAndUpdate({_id:postId},{ $pull: { likes: userId} },(err,post)=>{
      if(!post){
        console.log(err);
      }else{
        postsUserId=post.userId
      }
      Post.find({userId:postsUserId},(err,posts)=>{
        if(posts){
          User.findOneAndUpdate({_id:postsUserId},{"$set": { posts: posts }},(err,user)=>{
            if(err){
              console.log(err);
            }else{
              res.send(user)
            }
          })
        }else{
          console.log(err);
        }
      })
    })
}

const addComment = (req,res)=>{
    const {userId,postId,comntInput,userName} = req.body;
    let userPosts, postsUserId;
     const cmntObj = {
      cmnt: comntInput,
      by: userId,
      userName:userName
     }
    Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: cmntObj} },
      (err, post) => {
        if (!err) {
          postsUserId=post.userId
        } else {
          console.log(err);
        }
        Post.find({userId:postsUserId},(err,posts)=>{
          if(posts){
            User.findOneAndUpdate({_id:postsUserId},{"$set": { posts: posts }},(err,user)=>{
              if(err){
                console.log(err);
              }else{
                res.send(user)
              }
            })
          }else{
            console.log(err);
          }
        })
      }
    );
}

const deleteComment = (req,res)=>{
    const {userId,postId,cmnt,userName} = req.body;
    let userPosts, postsUserId;
     const cmntObj = {
      cmnt: cmnt,
      by: userId,
      userName:userName
     }
    
    Post.findOneAndUpdate({_id: postId },{ $pull: { comments: cmntObj} },(err,post)=>{
      if(err){
        console.log(err);
      }else{
        postsUserId=post.userId
      }
      Post.find({userId:postsUserId},(err,posts)=>{
        if(posts){
          User.findOneAndUpdate({_id:postsUserId},{"$set": { posts: posts }},(err,user)=>{
            if(err){
              console.log(err);
            }else{
              res.send(user)
            }
          })
        }else{
          console.log(err);
        }
      })
    })
}

export {post, deletePost, postLiked, addLike, removeLike, addComment, deleteComment}