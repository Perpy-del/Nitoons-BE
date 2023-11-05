import express from 'express';
import UserController from '../controllers/userController/userController';

export const router = express.Router();

router.post('/create-user', UserController.loginUser);
router.post('/validate-pin', UserController.validateUser)