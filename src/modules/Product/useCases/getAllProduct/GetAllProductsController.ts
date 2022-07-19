import { Request, Response } from "express";
import { GetAllProductsService } from "./GetAllProductsService";



export class GetAllProductsController {
    constructor(private getAllProductService: GetAllProductsService){}
    async handle(request:Request, response:Response) {
        const getLatestProducts = request.query.latest
        const getProductByCategory = request.query.category

        const getProducts = await this.getAllProductService.execute({getLatestProducts,getProductByCategory})
        return response.json(getProducts)
    }    
}