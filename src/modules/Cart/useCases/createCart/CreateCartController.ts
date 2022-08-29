import { CreateCartService } from "./CreateCartService"
import { Request, Response } from "express";
import { isEmpty } from "../../../../helpers/empty/Empty";
import AppError from "../../../../helpers/appError/AppError";

export class CreateCartController {
    constructor(private createCartService: CreateCartService){}
    async handle(request: Request, response: Response){
        
        if(isEmpty(request.body)) {
            throw new AppError("No data body defined, cart is empty",404)
        }
        
        const {userId, products:{productId, quantity}} = request.body

        if(!(userId && productId && quantity)) {
            throw new AppError("Missing JSON args!",404)
        }

        const newCart = await this.createCartService.execute({userId,products:{productId,quantity}})
      
        return response.status(201).json(newCart)
    }
}