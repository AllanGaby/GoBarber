import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from './../repositories/AppointmentRepository';
import CreateAppointmentService from './../services/CreateAppointmentService';

const appointmentRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentRouter.get('/', (request, response) => {
    response.json(appointmentRepository.all());
});

appointmentRouter.post('/', (request, response) => {
    try{
        const { provider, date } = request.body;
        const dateSerialized = parseISO(date);
        const createAppointment = new CreateAppointmentService(appointmentRepository);
        const appointment = createAppointment.execute({provider, date: dateSerialized});
        return response.json(appointment);
    }    
    catch(err){
        return response.status(400).json({error: err.message});
    }
});

export default appointmentRouter;