import { Request, Response } from 'express'
import UserPinController from '../../utils/generateRandomPin'
import dotenv from 'dotenv'
import sendMail from '../../utils/sendgrid_namespace'
import { ISendMail } from '../../utils/sendgrid_namespace'
import ResponseNamespace from '../../utils/responses_namespace'
// import { UserNamespace } from '../../lib/UserLogIn/user_login_namespace';
import { newToken } from '../../controllers/middlewares/jwtHandler'
import { config } from '../../config/index'
import UserModel from './models/userModel'
import otpModel from './models/otpModel'
dotenv.config()

export default class UserController {
  public static async loginUser(req: Request, res: Response) {
    const { email } = req.body

    // find existing user using email address
    const existingEmail = await UserModel.findOne({ email: req.body.email })

    // generate five digit pin
    const { randomPin, expiryTime } = UserPinController.generatePin(5)

    // send a mail with the five digit pin
    const mailOptions: ISendMail = {
      to: email,
      from: config.sendgridSender,
      subject: 'Welcome to Nitoons',
      text: 'Verify your Email',
      template: './template/sendPin.handlebars',
      payload: { verificationPin: randomPin },
    }
    
    try {
      // if email already exists
      if (existingEmail) {
        const { _id, email } = existingEmail
        const userId = _id

        // generate a new pin
        await otpModel.create({
          otp: randomPin,
          user_id: userId,
          expiry_time: expiryTime,
        })

        // send the mail with the generated pin
        await sendMail(mailOptions)

        const data = {
          userId: _id,
          email: email,
        }

        // return the response object
        return ResponseNamespace.sendSuccessMessage(
          res,
          data,
          res.status(200).statusCode,
          'User pin generated and mail sent successfully',
        )
      }

      // if the email does not exist, create a new user with the email
      const user = await UserModel.create({
        email: req.body.email,
      })

      // generate a new pin
      await otpModel.create({
        otp: randomPin,
        expiry_time: expiryTime,
        userId: user._id,
      })

      // send a mail with the generated pin
      await sendMail(mailOptions)

      const data = {
        userId: user._id,
        email: user.email,
      }

      // return the response object
      return ResponseNamespace.sendSuccessMessage(
        res,
        data,
        res.status(200).statusCode,
        'User pin generated and mail sent successfully',
      )
    } catch (error) {
      console.log('Error logging in user', error, error && error.message)
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error generating pin and sending email',
      )
    }
  }

  // VALIDATING USER PIN TO LOGIN USER
  public static async validateUser(req: Request, res: Response) {
    let { user_id, otp } = req.body

    const modelExist = await otpModel.findOne({
      user_id,
      otp,
    })

    try {
      // Check if the pin is expired
      if (UserPinController.checkIfPinIsExpired(modelExist?.expiry_time)) {
        return ResponseNamespace.BadUserRequestError(
          res,
          'Verification pin has expired. Click on Resend pin to generate another pin.',
        )
      }

      // Check if the pin is used
      else if (
        await otpModel.findOne({ user_id, otp, is_used: true })
      ) {
        return ResponseNamespace.BadUserRequestError(
          res,
          'This pin has already been used. Click on Resend pin to generate another pin',
        )
      }

      // Check if the pin is incorrect
      else if (modelExist?.otp !== otp) {
        return ResponseNamespace.BadUserRequestError(
          res,
          'Incorrect pin. Check your mail and input a valid pin.',
        )
      }

      // Pin is valid, generate a token and return it, then update otp's is_used to true
      else {
        const token = newToken(user_id)
        res.json({ token })
        await otpModel.findOneAndUpdate(
          {
            otp,
            user_id,
          },
          { is_used: true },
          { new: true },
        )
        console.log('Token sent and user logged in successfully')
      }
    } catch (error) {
      console.log('Error logging in user', error, error && error.message)
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error logging in user',
      )
    }
  }

  // CHECKING IF USER IS AUTHORIZED
  static async protectedRoute(req: Request, res: Response) {
    // Route logic for authenticated users only
    res.status(200).json({
      message: 'Protected route accessed successfully',
      status: 'Success',
    })
  }
}
