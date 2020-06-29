import {Request, Response, NextFunction} from 'express';
import {verify, decode} from 'jsonwebtoken';
import authConfig from '@configs/auth';
import {TokenPayload} from '@interfaces/auth';
import AppError from '@errors/AppError';

export default function ensureAuth(
  request:Request, 
  response:Response, 
  next:NextFunction
  ):void{
    const authHeader = request.headers.authorization;

    if(!authHeader){
      throw new AppError('Token is missing!', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, authConfig.secret);

      const {sub} = decoded as TokenPayload;

      request.user = {
        id: sub
      }

      return next();
    } catch (error) {
      throw new AppError('Token invalid', 401);
    }
}