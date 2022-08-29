import { Request, Response } from "express";
import AppError from "../../../../helpers/appError/AppError";
import { DeleteOrderService } from "./DeleteOrderService";


export class DeleteOrderController {
    constructor(private deleteOrderService: DeleteOrderService){}

    async handle(request: Request, response: Response){
        const orderId = request.params.id

        if (!orderId) {
            throw new AppError("Missing Params arg: ID", 400)
        }

        const deletedOrderById = await this.deleteOrderService.execute({orderId})
        return response.status(200).json({"Order has been deleted": deletedOrderById})
    }
}