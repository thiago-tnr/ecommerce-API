import { Request, Response } from "express";
import AppError from "../../../../helpers/appError/AppError";
import { GetAllCartsService } from "./GetAllCartsService";

export class GetAllCartsController {
    
    constructor(private getAllCartService: GetAllCartsService){}
    async handle(request: Request, response: Response) {
        const cart = await this.getAllCartService.execute()
        
        if(!cart) {
            throw new AppError('Cart not found',404)
        }
        return response.status(200).json(cart)
    }
}