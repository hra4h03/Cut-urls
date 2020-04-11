import { Request, Response, NextFunction } from "express";
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export interface UserAuthInfo extends Request {
  user?: {
    userId: string;
    token: string;
  } | string;
}

export default (req: UserAuthInfo, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorization?.split(' ')[1] //bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'no auth token'})
    }
    const key = process.env.JWTSecret as string
    const decoded = JWT.verify(token, key)  
    req.user = decoded as {
      userId: string;
      token: string;
    } | string
    next()
  } catch (e) {
    return res.status(401).json({ message: 'no auth token'})
  }
}