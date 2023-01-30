import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { TicketStatus } from "@prisma/client";

async function getTicketTypes() {

  const result = await ticketRepository.findTicketTypes();

  if(!result){
    throw notFoundError();
  }

  return result;
  
}

async function getTicketById(userId: number) {
  const enrollmentExist = await enrollmentRepository.findWithAddressByUserId(userId);

  if(!enrollmentExist){
    throw notFoundError();
  }

  const ticketExist = await ticketRepository.findTicketByEnrollment(enrollmentExist.id);

  if(!ticketExist){
    throw notFoundError();
  }

  return ticketExist;
}

async function postTicket(userId: number, ticketTypeId:  number) {
  const enrollmentExist = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentExist) {
    throw notFoundError();
  }

  const ticket = {
    ticketTypeId,
    enrollmentId: enrollmentExist.id,
    status: TicketStatus.RESERVED
  }
  
  await ticketRepository.postTicket(ticket); 
  
  const result = await ticketRepository.findTicketByEnrollment(enrollmentExist.id);

  return result;
}

const ticketsService = {
  getTicketTypes,
  getTicketById,
  postTicket 
};

export default ticketsService;
