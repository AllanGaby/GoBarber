import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from './../repositories/AppointmentsRepository';
import CreateAppointmentService from './../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';

const appointmentRouter = Router();

appointmentRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    response.json(await appointmentsRepository.find());
});

appointmentRouter.post('/', async (request, response) => {
    try{        
        const { provider, date } = request.body;
        const dateSerialized = parseISO(date);
        const createAppointment = new CreateAppointmentService();
        const appointment = await createAppointment.execute({provider, date: dateSerialized});
        return response.json(appointment);
    }    
    catch(err){
        return response.status(400).json({error: err.message});
    }
});

export default appointmentRouter;