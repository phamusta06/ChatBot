import { Router } from 'express'
import { login, logout, register, userDetails } from '../controllers/userController'
import authGuard from '../middleware/authGuard';
const router=Router()

//create user api
router.post("/register", register)
//check user login
router.post("/login", login);
//logout user
router.get("/logout", logout);
//get details user
router.get("/user-details",authGuard,userDetails);





export default router
