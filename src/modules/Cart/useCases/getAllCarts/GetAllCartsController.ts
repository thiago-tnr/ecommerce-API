import { Request, Response } from "express";
import { GetAllCartsService } from "./GetAllCartsService";



export class GetAllCartsController {
    
    constructor(private getAllCartService: GetAllCartsService){}
    async handle(request: Request, response: Response) {
        const cart = this.getAllCartService.execute()
        
        if(!cart) {
            return response.status(404).json(cart)
        }
        return response.status(200)
    }
}