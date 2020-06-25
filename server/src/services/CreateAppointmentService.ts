import { startOfHour } from 'date-fns';
import AppointmentsRepository from './../repositories/AppointmentsRepository';
import Appointment from './../models/Appointment';
import { getCustomRepository } from 'typeorm';

interface Request{
    provider: string;
    date: Date;
}

class CreateAppointmentService{
    public async execute({provider, date}: Request): Promise<Appointment>{
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);
        const appointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);
        if(appointmentInSameDate){
            throw new Error('This appointment is already booked');
        }
        const appointment = appointmentsRepository.create({provider, date: appointmentDate});
        await appointmentsRepository.save(appointment);
        return appointment;
    }
}

export default CreateAppointmentService;