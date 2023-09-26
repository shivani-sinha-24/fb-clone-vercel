import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

const addMessages =async (req,res)=>{
    const {conversationId,senderId,text,timeofMsg}=req.body;
    const newMessage = new Message({
        conversationId,
        senderId,
        text,
        timeofMsg,
    })
    
    try {
        const savedMessage = await newMessage.save()
        res.status(200).send(savedMessage)
    } catch (error) {
        res.status(500).send(error)
    }
}

export default addMessages;