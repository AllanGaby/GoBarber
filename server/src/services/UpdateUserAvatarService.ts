import { getRepository } from 'typeorm';
import User from './../models/User';
import uploadConfig from './../config/upload';
import fs from 'fs';
import path from 'path';
import AppError from './../errors/AppError';


interface Request{
    userId: string,
    fileName: string
}

class UpdateUserAvatarService{
    public async execute({userId, fileName}: Request): Promise<User>{
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(userId);
        if(!user){
            throw new AppError('Only authenticate user can change avatar.', 401);
        }

        if(user.avatar){
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = fileName;
        delete user.password;
        await userRepository.save(user);
        return user;
    }
}

export default UpdateUserAvatarService;