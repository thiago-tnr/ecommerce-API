import { Request, Response } from "express";
import AppError from "../../../../helpers/error/AppError";
import { GetUserOrderService } from "./GetUserOrderService";


export class GetUserOrderController {
    constructor(private getUserOrderService: GetUserOrderService){}
    async handle(request: Request, response: Response) {
        const userId = request.params.id

        if (!userId) {
            throw new AppError("Missgin params args: ID", 400)    
        }

        const getOrderByUserId = await this.getUserOrderService.execute({userId})

        return response.status(200).json(getOrderByUserId)

    }
}