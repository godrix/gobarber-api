export interface Appointment{
  id:string;
  provider:string;
  date:Date;
}

export interface CreateAppointmentDTO {
  provider_id:string;
  date:Date;
}

export interface RequestDTO {
  provider_id:string;
  date:Date;
}