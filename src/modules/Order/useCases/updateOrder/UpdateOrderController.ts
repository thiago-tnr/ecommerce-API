import { Request, Response } from "express";
import AppError from "../../../../helpers/error/AppError";
import { isEmpty } from "../../../../helpers/isEmpty/Empty";
import { UpdateOrderService } from "./UpdateOrderService";


export class UpdateOrderController{
    
    constructor(private updateOrderService: UpdateOrderService){}

    async handle(request: Request, response: Response) {
        const updateOrder = request.body
        const orderId = request.params.id
        if (isEmpty(updateOrder)) {
            throw new AppError('Missing JSON args: status', 400)    
        }

        const orderUpdated = await this.updateOrderService.execute({updateOrder, orderId})

        return response.status(200).json(orderUpdated)
    }
}