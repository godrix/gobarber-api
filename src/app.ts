  
import 'dotenv/config';
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors'; 
import routes from '@routes/index';
import '@database/index';
import uploadConfig from '@configs/upload';
import AppError from '@errors/AppError';



const app = express();
app.use(cors());
app.use('/files', express.static(uploadConfig.directory));
app.use(express.json());
app.use(routes);
app.use((err:Error, request:Request, response:Response, _:NextFunction)=>{
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status:'error',
      message:err.message
    })
  }

  console.error(err);

  return response.status(500).json({
    status:'error',
    message:'internal server error'
  });

});

export default app;