import { Request, Response } from "express";
import AppError from "../../../../helpers/appError/AppError";
import { GetProductService } from "./GetProductService";

export class GetProductController {

    constructor(private getProductService: GetProductService){}
    async handle(request:Request, response:Response) {
        const getProductById = request.params.id
        if (!getProductById) {
            throw new AppError("No ID set params", 400)
        }
        const getProduct = await this.getProductService.execute({getProductById})
        return response.json(getProduct)
    }
}