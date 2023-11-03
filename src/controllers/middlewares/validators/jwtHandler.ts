import { Request, NextFunction } from 'express';
import { UnAuthorizedError } from '../../../lib/errorHandler';
import { config } from '../../../config/index';
import { IUserSchema } from "../../../models/UserModel/userModel";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function authMiddleware(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;  
    const generateToken = authHeader && authHeader.split(' ')[1];

    try {
        if (!generateToken) {
            throw new UnAuthorizedError("Unauthorized. No token provided")
        }
    
        const payload: string | jwt.JwtPayload = jwt.verify(generateToken, config.jwtSecret);
        req.user = payload;
        next();
    } catch (error) {
        throw new UnAuthorizedError("Access denied, invalid token")
    }
}

export function newToken(user: any) {
    const payload = { userId: user._id, email: user.email};
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: 60 * 60 * 24 });
    return token;
}