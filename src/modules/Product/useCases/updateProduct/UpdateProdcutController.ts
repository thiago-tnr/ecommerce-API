import { Request, Response } from "express";
import AppError from "../../../../helpers/error/AppError";
import { UpdateProductService } from "./UpdateProdcutService";


export class UpdateProdcutController {

    constructor(private updateProductService: UpdateProductService){}

     async handle(request: Request, response:Response){
        const requestBody = request.body;
        const productId = request.params.id
        if (Object.entries(requestBody).length === 0) {
            return response.status(404).json({message: "No data body defined, nothing to update"})
        }

        if (!productId) {
            return response.status(404).json({message: "No ID set params"})
        }

        const updateProduct = await this.updateProductService.execute({requestBody, productId})
        return response.json(updateProduct);
     }
}