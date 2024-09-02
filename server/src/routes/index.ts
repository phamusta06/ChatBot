import { Router } from 'express'
import { login, logout, register, userDetails } from '../controllers/userController'
import authGuard from '../middleware/authGuard';
import { ai, getConversation } from '../controllers/ConversationController';
const router=Router()

//create user api
router.post("/register", register)
//check user login
router.post("/login", login);
//logout user
router.get("/logout", logout);
//get details user
router.get("/user-details",authGuard,userDetails);
//get Conversation by user
router.get("/user-details",authGuard,getConversation);
//new message
router.post("/new-message",authGuard, getConversation);
//ai Response
router.post("/ai", authGuard,ai);



 





export default router
