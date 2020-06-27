import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from './../repositories/AppointmentsRepository';
import CreateAppointmentService from './../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';
import ensrureAuthenticated from './../middleware/ensrureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensrureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const { id } = request.user;
    response.json(await appointmentsRepository.find({
        provider_id: id
    }));
});

appointmentsRouter.post('/', async (request, response) => {      
    const provider_id = request.user.id;
    const { date } = request.body;
    const dateSerialized = parseISO(date);
    const createAppointment = new CreateAppointmentService();
    const appointment = await createAppointment.execute({provider_id, date: dateSerialized});
    return response.json(appointment);
});

export default appointmentsRouter;