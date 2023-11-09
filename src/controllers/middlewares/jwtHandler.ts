import { NextFunction, Response } from 'express';
import { config } from '../../config/index';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Types } from 'mongoose';
import ResponseNamespace from '../../utils/responses_namespace';
dotenv.config();

export function authMiddleware(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const generateToken = authHeader && authHeader.split(' ')[1];

  try {
    if (!generateToken) {
      ResponseNamespace.UnauthorizedError(
        res,
        'Unauthorized. No token provided'
      );
    }

    const payload: string | jwt.JwtPayload = jwt.verify(
      generateToken,
      config.jwtSecret
    );
    req.user = payload;
    next();
  } catch (error) {
    ResponseNamespace.UnauthorizedError(res, 'Access denied, invalid token');
  }
}

export function newToken(user_id: Types.ObjectId) {
  const payload = { userId: user_id };
  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: 2 * 60 * 60 * 24,
  });
  return token;
}
