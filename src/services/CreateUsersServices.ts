import {hash} from 'bcryptjs';
import {getRepository} from 'typeorm';
import { RequestDTO } from '@interfaces/users';
import User from '@models/User';
import AppError from '@errors/AppError';

class CreateUserServive {

  public async execute({name, email, password}:RequestDTO):Promise<User>{
    const usersRepository = getRepository(User);

    const isExist = await usersRepository.findOne({
      where:{ email }
    });

    if(isExist){
      throw new AppError('Email address already used');
    }

    const hashPass = await hash(password, 8);

    const user = usersRepository.create({
      name, email, password:hashPass
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserServive;