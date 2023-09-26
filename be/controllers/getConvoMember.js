import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

const getConvoMember =async (req,res)=>{
    const {conversationId} = req.body 
    try {
        const conversation = await Conversation.findOne({
            _id:conversationId
        })
        res.status(200).send(conversation)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}
export default getConvoMember;