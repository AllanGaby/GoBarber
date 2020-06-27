import User from './../models/User';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from './../errors/AppError';

interface Request{
    name: string,
    email: string,
    password: string
}

class CreateUserService{
    public async execute({name, email, password}: Request): Promise<User>{
        const userRepository = getRepository(User);

        const userSameEmail = await userRepository.findOne({
            email
        });
        
        if(userSameEmail){
            throw new AppError('Email is already used.');
        }

        const hasedPassword = await hash(password, 8);
        const user = userRepository.create({
            name, 
            email, 
            password: hasedPassword
        });
        await userRepository.save(user);
        delete user.password;
        return user;
    }
}

export default CreateUserService;