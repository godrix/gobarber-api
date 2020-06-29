import { Router, request, response } from 'express';
import CreateUserService from '@services/CreateUsersServices';
import UpdateUserAvatarService from '@services/UpdateUserAvatarService';
import ensureAuth from '@middlewares/ensureAuth';
import multer from 'multer';
import multerConfig from '@configs/upload';

const usersRoutes = Router();
const upload = multer(multerConfig);

usersRoutes.post('/', async (request, response)=>{
  try {
    const {name, email, password} = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({name, email, password});

    delete user.password;

    return response.json(user)

  } catch (error) {
    return response.status(400).json({error:error.message})
  }
});

usersRoutes.patch('/avatar', ensureAuth, upload.single('avatar'), 
async(request, response)=>{
    const updateUserAvatar =  new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      user_id:request.user.id,
      avatar_filename:request.file.filename
    });

    delete user.password;

    return response.json(user);
});


export default usersRoutes;