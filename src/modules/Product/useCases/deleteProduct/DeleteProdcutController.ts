import { Request, Response } from "express";
import AppError from "../../../../helpers/appError/AppError";
import { DeleteProductService } from "./DeleteProdcutService";



export class DeleteProductContrller {

    constructor(private deleteProductService:DeleteProductService){}
    async handle(request: Request, response:Response) {
        const productId = request.params.id

        if (!productId) {
            throw new AppError("No ID set params", 400)
        }

        const deleteProductById = await this.deleteProductService.execute({productId})
        return response.json({"Product successfully deleted" : deleteProductById})
    }    
}