import { Request, Response } from "express";
import AppError from "../../../../helpers/error/AppError";
import { CreateProductsService } from "./CreateProductService";

export class CreateProductController {

    constructor(private createProductsService: CreateProductsService){}

    async handle(request: Request, response: Response) {
     const {title, desc, categories, size, color, price, inStock} = request.body;

     if(!(title && desc && categories && size && color && price && inStock)){
        throw new AppError("Missing JSON args!", 400)
     }

     const createProduct = await this.createProductsService.execute({title, 
     desc, categories, size, color, price, inStock})
     return response.json(createProduct).status(201)
    }
}