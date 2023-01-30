import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";

async function getTicketTypes() {

  const result = await ticketRepository.findTicketTypes();

  if(!result){
    throw notFoundError();
  }

  return result;
  
}

const ticketsService = {
  getTicketTypes
};

export default ticketsService;
