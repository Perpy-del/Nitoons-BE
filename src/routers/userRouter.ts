import express from 'express';
import UserController from '../controllers/userController/userController';
import {validatorNamespace} from '../controllers/middlewares/validators/userValidator'

export const router = express.Router();

router.post('/create-user', validatorNamespace.emailValidator, UserController.loginUser);
router.post('/validate-pin', validatorNamespace.pinValidator, UserController.validateUser)