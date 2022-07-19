import { Request, Response } from "express";
import { GetProductService } from "./GetProductService";



export class GetProductController {

    constructor(private getProductService: GetProductService){}
    async handle(request:Request, response:Response) {
        const getProductById = request.params.id
        if (!getProductById) {
            return response.status(400).json({message: "No ID set params"})
        }
        const getProduct = await this.getProductService.execute({getProductById})
        return response.json(getProduct)
    }
}