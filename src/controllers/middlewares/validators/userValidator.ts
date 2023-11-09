import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const emailValidator = (req: Request, res: Response, next: NextFunction) => {
  const validateEmail = Joi.object({
    email: Joi.string()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Not a valid email address. Please input a valid email address.",
      }),
  })
  const { error } = validateEmail.validate(req.body)
  if (error) {
    console.log(error);
    throw error;
  }
  next();
}

const pinValidator = (req: Request, res: Response, next: NextFunction) => {
  const validatePin = Joi.object({
    otp: Joi.number().required().messages({
      "string.pattern.base":
        "Please enter a valid pin number"
    }),
    user_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
      "string.pattern.base":
        "Invalid user id"
    }),
  })
  const { error } = validatePin.validate(req.body)
  if (error) {
    console.log(error);
    throw error;
  }
  next();
}

export const validatorNamespace = {
  emailValidator,
  pinValidator
};