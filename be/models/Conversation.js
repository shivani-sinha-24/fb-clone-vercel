import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        members:[String]
    },
    {
        timestamps:true
    }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;