import { Router } from 'express';
import ensrureAuthenticated from './../middleware/ensrureAuthenticated';
import CreateUserService from './../services/CreateUserService';
import UpdateUserAvatarService from './../services/UpdateUserAvatarService';
import multer from 'multer';
import uploadConfig from './../config/upload';

const usersRouter = Router();
const uploadFile = multer(uploadConfig);

usersRouter.post('/', async (request, response) => { 
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({
        name, 
        email,
        password
    });
    response.status(201).json(user);
});

usersRouter.patch('/avatar', ensrureAuthenticated, uploadFile.single('avatar'), async (request, response) => {
    const { filename } = request.file;
    const { id } = request.user;
    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({userId: id, fileName: filename});
    response.json(user);
});

export default usersRouter;