import express from 'express';
import addMessages from '../controllers/addMessages.js';
import getMessages from '../controllers/getMessages.js';

const router = express.Router()
router.post("/",addMessages);
router.get("/:conversationId",getMessages)

export default router;