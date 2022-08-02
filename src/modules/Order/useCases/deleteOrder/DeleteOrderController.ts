import { Request, Response } from "express";
import { DeleteOrderService } from "./DeleteOrderService";


export class DeleteOrderController {
    constructor(private deleteOrderService: DeleteOrderService){}

    async handle(request: Request, response: Response){
        const orderId = request.params.id

        if (!orderId) {
            return response.status(404).json("Missing Params arg: ID")
        }

        const deletedOrderById = await this.deleteOrderService.execute({orderId})
        return response.status(200).json({"Order has been deleted": deletedOrderById})
    }
}