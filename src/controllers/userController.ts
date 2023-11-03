import { Request, Response } from 'express';
import UserPinController from '../utils/generateRandomFiveDigitPin';
import userValidator from './middlewares/validators/userValidator';
import dotenv from 'dotenv';
import sendMail from '../lib/sendgrid_namespace';
import { ISendMail } from '../lib/sendgrid_namespace';
import ResponseNamespace from '../utils/responses_namespace';
import { UserNamespace } from '../lib/UserLogIn/user_login_namespace';
import { newToken } from './middlewares/validators/jwtHandler';
import { config } from '../config/index';
dotenv.config();

export default class UserController {
  static async loginUser(req: Request, res: Response) {
    const { email } = req.body;
    const pin = UserPinController.generateFiveDigitPin(5);

    const { error } = userValidator.validate(req.body);
    if (error) throw error;
    const existingEmail = await UserNamespace.getUser({
      email: req.body.email,
    });

    const mailOptions: ISendMail = {
      to: email,
      from: config.sendgridSender,
      subject: 'Welcome to Nitoons',
      text: 'Verify your Email',
      template: './template/sendPin.handlebars',
      payload: { verificationPin: pin },
    };

    try {
      if (existingEmail) {
        const { _id, email } = existingEmail;

        const existingUser = await UserNamespace.getUser({ email });
        await sendMail(mailOptions);

        const data = {
            userId: existingUser._id,
            email: existingUser.email,
            fiveDigitPin: pin,
            accessToken: newToken(existingUser),
        };
        
        return ResponseNamespace.sendSuccessMessage(
          res,
          data,
          res.status(200).statusCode,
          'Login success message'
        );
      }

      const user = await UserNamespace.addAndLoginUser({ email: req.body.email });

      const data = {
        userId: user._id,
        email: user.email,
        fiveDigitPin: pin,
        accessToken: newToken(user),
      };

      await sendMail(mailOptions);

      return ResponseNamespace.sendSuccessMessage(
        res,
        data,
        res.status(200).statusCode,
        'User added and logged in successfully'
      );
    } catch (error) {
      console.log('Error logging in user', error, error && error.message);
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error logging in'
      );
    }
  }
}

// sendMail(
//     to: 'recipient@example.com',
//     from: 'sender@example.com',
//     subject: 'Your Subject',
//     text: 'Your plain text content',
//     html: '<p>Your HTML content</p>',
// );
