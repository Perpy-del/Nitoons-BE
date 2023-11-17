import { Request, Response } from 'express';
import UserPinController from '../../utils/generateRandomPin';
import dotenv from 'dotenv';
import sendMail from '../../utils/sendgrid_namespace';
import { ISendMail } from '../../utils/sendgrid_namespace';
import ResponseNamespace from '../../utils/responses_namespace';
import UserNamespace from '../../lib/Users/UserNamespace';
import { newToken } from '../middlewares/jwtHandler';
import otpNamespace from '../../lib/Users/otpNamespace';
import { config } from '../../config/index';
dotenv.config();

export default class UserController {
  static async loginUser(req: Request, res: Response) {
    const { email } = req.body;

    const existingEmail = await UserNamespace.getUser({
      email: req.body.email,
    });
    const { randomPin, expiryTime } = UserPinController.generatePin(5);

    const mailOptions: ISendMail = {
      to: email,
      from: config.sendgridSender,
      subject: 'Welcome to Nitoons',
      text: 'Verify your Email',
      template: './template/sendPin.handlebars',
      payload: { verificationPin: randomPin },
    };

    try {
      if (existingEmail) {
        const { _id, email } = existingEmail;
        const userId = _id;
        otpNamespace.addNewPin({
          otp: randomPin,
          expiryTime,
          userId
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

      otpNamespace.addNewPin({
        otp: randomPin,
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
    let { user_id, otp } = req.body;

    const modelExist = await otpNamespace.getPin({
      userId: user_id,
      otp,
    });

    console.log(modelExist);

    try {
      // Check if the pin is expired
      if (UserPinController.checkIfPinIsExpired(modelExist?.expiry_time)) {
        console.log(modelExist?.expiry_time.getSeconds());
        return ResponseNamespace.BadUserRequestError(
          res,
          'Verification pin has expired. Click on Resend pin to generate another pin.'
        );
      }

      // Check if the pin is used
      else if (await otpNamespace.getPinIsUsed({ userId: user_id, otp })) {
        return ResponseNamespace.BadUserRequestError(
          res,
          'This pin has already been used. Click on Resend pin to generate another pin'
        );
      }

      // Check if the pin is incorrect
      else if (modelExist?.otp !== otp) {
        return ResponseNamespace.BadUserRequestError(
          res,
          'Incorrect pin. Check your mail and input a valid pin.'
        );
      }

      // Pin is valid, generate a token and return it, then update otp's is_used to true
      else {
        const token = newToken(user_id);
        res.json({ token });
        await otpNamespace.updatePinIsUsed({
          otp,
          userId: user_id,
        });
        console.log('Token sent and user logged in successfully');
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
