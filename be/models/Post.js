import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    caption: String,
    image: String,
    date: String,
    comments: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
  });

const Post = mongoose.model("Post", postSchema);

export default Post;