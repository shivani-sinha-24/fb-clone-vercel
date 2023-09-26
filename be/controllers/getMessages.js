import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

const getMessages =async (req,res)=>{
    try {
        const message = await Message.find({
            conversationId:{$in:req.params.conversationId}
        })
        res.status(200).send(message)
    } catch (error) {
        res.status(500).send(error)
    }
}
export default getMessages;