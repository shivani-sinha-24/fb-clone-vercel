import express from 'express';
import addConversation from '../controllers/addConversation.js';
import getConversation from '../controllers/getConversation.js';
import getConvoMember from '../controllers/getConvoMember.js';

const router = express.Router()
router.post("/",getConversation);
router.post("/add-conversation",addConversation);
router.post("/get-conversation-member",getConvoMember);

export default router