import { Router } from 'express';
import AuthenticateUserService from './../services/AuthenticateUserService';
import AppError from '../errors/AppError';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {         
    const { email, password } = request.body;        
    const authenticateUser = new AuthenticateUserService();
    try{
        const { user, token } = await authenticateUser.execute({email, password});
        return response.json({
            user,
            token
        });
    }
    catch(err)
    {
        throw new AppError(err.message, err.statusCode);
        console.log(err);
    }
});

export default sessionsRouter;