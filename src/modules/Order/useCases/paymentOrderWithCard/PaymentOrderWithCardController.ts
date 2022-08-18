import { Request, Response } from "express";
import AppError from "../../../../helpers/error/AppError";
import { PaymentOrderWithCardService } from "./PaymentOrderWithCardCardService";



export class PaymentOrderWithCardController{

    constructor(private paymentOrderWithCardService: PaymentOrderWithCardService){}
    async handle(request: Request, response: Response){
        const {number, dueDate, codeValidation, orderId } = request.body

        if (!number || !dueDate || !codeValidation) {
            throw new AppError('Missing JSON args', 400)
        }

        const cardValidation = await this.paymentOrderWithCardService.execute({number, dueDate, codeValidation, orderId })

        const orderPaid = cardValidation[0]
        const cardFlag = cardValidation[1]

        return response.json({orderPaid, card: {number, dueDate, codeValidation, orderId, cardFlag}})
    }
}