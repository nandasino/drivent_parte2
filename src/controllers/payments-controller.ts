import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketId = Number(req.query.ticketId);
    const { userId } = req;

    if(!ticketId){
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const paymentExist = await paymentsService.getPayments(ticketId, userId);

    if(!paymentExist){
        return res.sendStatus(httpStatus.NOT_FOUND)
    }

    return res.status(httpStatus.OK).send(paymentExist);
  } catch (error) {
    if (error.name !== "UnauthorizedError") {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

