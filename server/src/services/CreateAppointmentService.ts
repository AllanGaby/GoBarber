import { startOfHour, isEqual } from 'date-fns';
import AppointmentRepository from './../repositories/AppointmentRepository';
import Appointment from './../models/Appointment';

interface Request{
    provider: string;
    date: Date;
}

class CreateAppointmentService{
    private appointmentRepository: AppointmentRepository;

    constructor(appointmentRepository: AppointmentRepository){
        this.appointmentRepository = appointmentRepository;
    }

    public execute({provider, date}: Request): Appointment{
        const appointmentDate = startOfHour(date);
        const appointmentInSameDate = this.appointmentRepository.findByDate(appointmentDate);
        if(appointmentInSameDate){
            throw new Error('This appointment is already booked');
        }
        const appointment = this.appointmentRepository.create({provider, date: appointmentDate});
        return appointment;
    }
}

export default CreateAppointmentService;