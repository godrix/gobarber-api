import { RequestAvatarDTO } from '@interfaces/users';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@configs/upload';
import { getRepository } from 'typeorm';
import User from '@models/User';
import AppError from '@errors/AppError';

class UpdateUserAvatarService {

  public async execute({ user_id, avatar_filename }: RequestAvatarDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      //  TODO
      // [] Deletar old avatar

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatar_filename;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;