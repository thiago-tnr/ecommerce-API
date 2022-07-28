import { CreateCartService } from "./CreateCartService"
import { Request, Response } from "express";
import { isEmpty } from "../../../../helpers/isEmpty/Empty";

export class CreateCartController {
    constructor(private createCartService: CreateCartService){}
    async handle(request: Request, response: Response){
        
        if(isEmpty(request.body)) {
            return response.status(404).json({message: "No data body defined, cart is empty"})
        }
        
        const {userId, products:{productId, quantity}} = request.body

        if(!(userId && productId && quantity)) {
            return response.status(404).json({message: "Missing JSON args!"})
        }

        const newCart = await this.createCartService.execute({userId,products:{productId,quantity}})
      
        return response.status(201).json(newCart)
    }
}