import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function getPayments(ticketId: number, userId: number) {

const ticket = await ticketRepository.findTicketById(ticketId);

if(!ticket){
    throw notFoundError();
}

const enrollment = await enrollmentRepository.findById(ticket.enrollmentId)

if(enrollment.userId !== userId){
    throw unauthorizedError();
}

const paymentExist = await paymentRepository.findPayments(ticketId);
    
  if(!paymentExist){
    throw notFoundError();
  }

  return paymentExist;
  
}

const ticketsService = {
  getPayments,
};

export default ticketsService;
