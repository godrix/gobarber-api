import { Router } from 'express';
import { parseISO } from 'date-fns';
import {getCustomRepository} from 'typeorm';
import AppointmentsRepository from '@repositories/AppointmentsRepository';
import CreateappointmentService from '@services/CreateAppointmentService';

import ensureAuth from '@middlewares/ensureAuth';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuth);

appointmentsRouter.get('/', async (request, response)=>{
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);

});

appointmentsRouter.post('/', async (request, response)=>{
    const { provider_id, date } = request.body;
    
    const parseDate = parseISO(date);
    
    const createAppointment = new CreateappointmentService();
    
    const appointment = await createAppointment.execute({provider_id, date:parseDate});
    return response.json(appointment);
 
});

export default appointmentsRouter;