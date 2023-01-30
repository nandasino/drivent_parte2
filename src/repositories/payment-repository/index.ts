import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function findPayments(ticket: number) {
  return prisma.payment.findFirst({
    where:{
        ticketId: ticket,
    }
  });
} 

const paymentRepository = {
  findPayments,
};

export default paymentRepository;
