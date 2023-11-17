import express from 'express'
import UserController from '../userController/userController'
import { validatorNamespace } from '../middlewares/validators/userValidator'
import { authMiddleware } from '../middlewares/jwtHandler'

export const router = express.Router()

router.post(
  '/create-user',
  validatorNamespace.emailValidator,
  UserController.loginUser,
)
router.post(
  '/validate-pin',
  validatorNamespace.pinValidator,
  UserController.validateUser,
)

router.get('/protected', authMiddleware, UserController.protectedRoute)
