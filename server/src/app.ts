import express, {Request, Response, NextFunction} from 'express';
import 'express-async-error';
import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();
app.use(express.json());
app.use(routes);
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }
    else{
        return response.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });        
    }    
});
app.use('/files', express.static(uploadConfig.directory));

export default app;
