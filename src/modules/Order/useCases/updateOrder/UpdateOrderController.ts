import { Request, Response } from "express";
import { isEmpty } from "../../../../helpers/isEmpty/Empty";
import { UpdateOrderService } from "./UpdateOrderService";


export class UpdateOrderController{
    
    constructor(private updateOrderService: UpdateOrderService){}

    async handle(request: Request, response: Response) {
        const updateOrder = request.body
        const orderId = request.params.id

        if (isEmpty(updateOrder)) {
            return response.status(404).json('Missing JSON args: status')    
        }

        const orderUpdated = await this.updateOrderService.execute({updateOrder, orderId})

        return response.status(200).json(orderUpdated)
    }
}