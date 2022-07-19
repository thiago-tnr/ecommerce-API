import { Request, Response } from "express";
import { DeleteProductService } from "./DeleteProdcutService";



export class DeleteProductContrller {

    constructor(private deleteProductService:DeleteProductService){}
    async handle(request: Request, response:Response) {
        const productId = request.params.id

        if (!productId) {
            return response.status(400).json({message: "No ID set params"})
        }

        const deleteProductById = await this.deleteProductService.execute({productId})
        return response.json({"product deleted" : deleteProductById})
    }    
}