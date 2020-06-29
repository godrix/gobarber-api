import User from '@models/User';

export interface RequestDTO {
  email:string;
  password:string;
}

export interface ResponseDTO {
 user:User;
 token:string;
}

export interface TokenPayload{
  iat:number;
  exp:number;
  sub:string;
}