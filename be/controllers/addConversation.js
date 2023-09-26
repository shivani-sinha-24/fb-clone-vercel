import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

const addConversation = (req,res)=>{
    const {senderId,recieverId}=req.body;
    let conversationId
    Conversation.findOne({members:{$all:[senderId,recieverId]}},(err,conversation)=>{
        if(conversation){
            res.status(200).send(conversation)
        }else{
            const newConversation = new Conversation({
                members:[senderId,recieverId],
            })
            const savedConversation = newConversation.save()
            conversationId = (savedConversation._id);
            Conversation.findOne({members:{$all:[senderId,recieverId]}},(err,newConversation)=>{
                if(newConversation){
                    res.status(200).send(newConversation)
                }
            })
        }
    })
}

export default addConversation;