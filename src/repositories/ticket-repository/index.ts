import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function findTicketTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketByEnrollment(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: enrollmentId, 
    },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType:true,
      createdAt: true,
      updatedAt: true,
    }
  });
}

async function postTicket(ticket: TicketParams) {
  return prisma.ticket.create({
    data: ticket,
  });
}

async function findTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true, 
    }
  });
}


export type TicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">   

const ticketRepository = {
  findTicketTypes,
  findTicketByEnrollment,
  postTicket,
  findTicketById
};

export default ticketRepository;
