import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
    
  try {
    const ticketTypes = await ticketsService.getTicketTypes();

    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
  try {
    const tickets = await ticketsService.getTicketById(userId);

    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;

  if(!ticketTypeId){
    return res.sendStatus(httpStatus.BAD_REQUEST)
  }
  
try {
  const tickets = await ticketsService.postTicket(userId, ticketTypeId);

  return res.status(httpStatus.CREATED).send(tickets);
} catch (error) {
  return res.sendStatus(httpStatus.NOT_FOUND); 
}
}
