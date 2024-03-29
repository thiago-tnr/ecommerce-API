import { Request, Response } from "express";
import AppError from "../../../../helpers/appError/AppError";
import { isEmpty } from "../../../../helpers/empty/Empty";
import { CreateOrderService } from "./CreateOrderService";

export class CreateOrderController {
    constructor(private createOrderService: CreateOrderService){}
    async handle(request: Request, response: Response) {

        if(isEmpty(request.body)) {
            throw new AppError("No data body defined", 400)
        }

        const {userId,amount,address} = request.body
        const {products:{productId, quantity}} = request.body
        
        if(!(userId && amount && address && productId && quantity)) {
            if (quantity == 0) {
                throw new AppError("Quantity not can be equals 0", 400)
            }
            throw new AppError("Missing JSON args!", 404)
        }

        const newOrder = await this.createOrderService.execute({userId,products:{productId,quantity},amount, address})
        return response.status(201).json(newOrder);
    }
}
