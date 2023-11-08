import { Request, Response } from 'express';
import UserPinController from './generateRandomFiveDigitPin';
// import userValidator from '../middlewares/validators/userValidator';
import dotenv from 'dotenv';
import sendMail from '../../lib/sendgrid_namespace';
import { ISendMail } from '../../lib/sendgrid_namespace';
import ResponseNamespace from '../../utils/responses_namespace';
import { UserNamespace } from '../../lib/UserLogIn/user_login_namespace';
import { newToken } from '../middlewares/jwtHandler';
import { fiveDigitPinNamespace } from '../../lib/UserLogIn/five_digit_pin_namespace';
import { config } from '../../config/index';
dotenv.config();

export default class UserController {
  static async loginUser(req: Request, res: Response) {
    const { email } = req.body;

    // const { error } = userValidator.validate(req.body);
    // if (error) throw error;
    const existingEmail = await UserNamespace.getUser({
      email: req.body.email,
    });
    const { fiveDigitPin, expiryTime } =
      UserPinController.generateFiveDigitPin(5);

    const mailOptions: ISendMail = {
      to: email,
      from: config.sendgridSender,
      subject: 'Welcome to Nitoons',
      text: 'Verify your Email',
      template: './template/sendPin.handlebars',
      payload: { verificationPin: fiveDigitPin },
    };

    try {
      if (existingEmail) {
        const { _id, email } = existingEmail;
        const userId = _id;
        fiveDigitPinNamespace.updatePin({
          fiveDigitPin,
          expiryTime,
          userId,
        });

        await sendMail(mailOptions);

        const data = {
          userId: _id,
          email: email,
        };

        return ResponseNamespace.sendSuccessMessage(
          res,
          data,
          res.status(200).statusCode,
          'User pin generated and mail sent successfully'
        );
      }

      const user = await UserNamespace.addAndLoginUser({
        email: req.body.email,
      });

      fiveDigitPinNamespace.addNewPin({
        fiveDigitPin,
        expiryTime,
        userId: user._id,
      });

      const data = {
        userId: user._id,
        email: user.email,
      };

      await sendMail(mailOptions);

      return ResponseNamespace.sendSuccessMessage(
        res,
        data,
        res.status(200).statusCode,
        'User pin generated and mail sent successfully'
      );
    } catch (error) {
      console.log('Error logging in user', error, error && error.message);
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error generating pin and sending email'
      );
    }
  }

  static async validateUser(req: Request, res: Response) {
    let { user_id, five_digit_pin } = req.body;

    try {
      const modelExist = await fiveDigitPinNamespace.getPin({
        userId: user_id,
      });

      if (modelExist[0]?.five_digit_pin !== five_digit_pin) {
        ResponseNamespace.BadUserRequestError(
          res,
          'Incorrect pin. Check your mail and input a valid pin.'
        );
      } else {
        const expiry_time = modelExist[0]?.expiry_time;
        const pinIsExpired = UserPinController.checkIfPinIsExpired(expiry_time);

        if (pinIsExpired) {
          // res.send("Verification pin has expired.")
          ResponseNamespace.BadUserRequestError(
            res,
            'Verification pin has expired. Click on Resend code to generate another pin.'
          );
        } else {
          const token = newToken(user_id);
          res.json({ token });
          console.log('User token sent successfully');
        }
      }
    } catch (error) {
      console.log('Error logging in user', error, error && error.message);
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error logging in user'
      );
    }
  }
}
