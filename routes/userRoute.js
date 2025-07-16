import express from 'express';
import { registerUser, loginUser, logoutUser, refreshToken } from '../controllers/userController.js';

const router = express.Router();

//Auth Routes
router.post('/signup', registerUser);    
router.post('/signin', loginUser);      
router.post('/signout', logoutUser);    
router.get('/refresh', refreshToken);   

export default router;
