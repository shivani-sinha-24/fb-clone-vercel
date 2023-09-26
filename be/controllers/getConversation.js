import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

const getConversation = async (req,res)=>{
    const {userId} = req.body 
    try {
        const conversation = await Conversation.find({
            members:{$in:userId}
        })
        res.status(200).send(conversation)
    } catch (error) {
        res.status(500).send(error)
    }
};

export default getConversation;