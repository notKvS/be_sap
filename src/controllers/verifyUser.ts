import { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');

interface CustomReq extends Request {
  user?: object;
}

export const verifyUser = (req: CustomReq, res: Response, next: NextFunction) => {
  // const token = req.header('Authorization');
  const token = req?.cookies?.token || req?.headers?.authorization?.split(' ')[1];
  console.log('Token received:', token);
  const SECRET_KEY = process.env.TOKEN_SECRET as string;
  if (!token) {
    return res.status(401).json({ message: 'No token ' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('decoding verify:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};