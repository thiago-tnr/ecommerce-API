import { Request, Response } from "express";
import { isEmpty } from "../../../../helpers/isEmpty/Empty";
import { CreateOrderService } from "./CreateOrderService";

export class CreateOrderController {
    constructor(private createOrderService: CreateOrderService){}
    async handle(request: Request, response: Response) {

        if(isEmpty(request.body)) {
            return response.status(404).json({message: "No data body defined"})
        }

        const {userId,amount,address} = request.body
        const {product:{productId, quantity}} = request.body
        
        if(!(userId && amount && address && productId && quantity)) {
            if (quantity == 0) {
                return response.status(404).json({message: "Quantity not can be equals 0"})
            }
            return response.status(404).json({message: "Missing JSON args!"})
        }

        const newOrder = await this.createOrderService.execute({userId,product:{productId,quantity},amount, address})
        return response.status(201).json(newOrder);
    }
}
