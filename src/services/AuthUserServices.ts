import {getRepository} from 'typeorm';
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import User from '@models/User';
import AppError from '@errors/AppError';
import {RequestDTO, ResponseDTO} from '@interfaces/auth';
import authConfig from '@configs/auth';

class AuthUserService {
  public async execute({email, password}:RequestDTO):Promise<ResponseDTO>{
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: {email}
    });

    if(!user){
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMath = await compare(password,  user.password);

    if(!passwordMath){
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfig.secret, {
      subject:user.id,
      expiresIn:authConfig.expiresIn
    })

    return {
      user, token
    }


    
  }
}

export default AuthUserService;