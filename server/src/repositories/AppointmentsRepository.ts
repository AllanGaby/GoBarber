import Appointment from './../models/Appointment';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment>{
    public async findByDate(date: Date): Promise<Appointment | null> {
        return await this.findOne({
            where: { date }
        }) || null;
    }
}

export default AppointmentRepository;