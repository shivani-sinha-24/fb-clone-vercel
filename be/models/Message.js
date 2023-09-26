import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        conversationId:{
            type:String
        },
        senderId:{
            type:String
        },
        text:{
            type:String
        },
        timeofMsg:String
    }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;