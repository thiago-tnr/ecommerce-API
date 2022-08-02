import { Request, Response } from "express";
import { GetUserOrderService } from "./GetUserOrderService";


export class GetUserOrderController {
    constructor(private getUserOrderService: GetUserOrderService){}
    async handle(request: Request, response: Response) {
        const userId = request.params.id

        if (!userId) {
            return response.status(404).json("Missgin params args: ID")    
        }

        const getOrderByUserId = await this.getUserOrderService.execute({userId})

        return response.status(200).json(getOrderByUserId)

    }
}