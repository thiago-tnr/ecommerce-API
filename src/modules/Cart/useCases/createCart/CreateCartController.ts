import { CreateCartService } from "./CreateCartService"
import { Request, Response } from "express";


export class CreateCartController {
    constructor(private createCartService: CreateCartService){}
    async handle(request: Request, response: Response){
        const {userId} = request.body
        const {products:{productId, quantity}} = request.body

        if(Object.entries(request.body).length === 0) {
            return response.status(404).json({message: "No data body defined, cart is empty"})
        }
        
        if(!(userId && productId && quantity)) {
            return response.status(404).json({message: "Missing JSON args!"})
        }

        const newCart = await this.createCartService.execute({userId,products:{productId,quantity}})
      
        return response.status(201).json(newCart)
    }
}