import { Request, Response } from "express";
import { CreateProductsService } from "./CreateProductService";

export class CreateProductController {

    constructor(private createProductsService: CreateProductsService){}

    async handle(request: Request, response: Response) {
     const {title, desc, img, categories, size, color, price, inStock} = request.body;
     if(!(title && desc && img && categories && size && color && price && inStock)){
          return response.status(404).json({message: "Missing JSON args!"})
     }
     const typeCategories = typeof(categories)
     const typeSize = typeof(size)
     const typeColor = typeof(price)

     // if (typeCategories !== "object" && typeSize !== "object" && typeColor !== "object"){
     //      return response.status(404).json({message: "Categories, size and color must be of the type object"})
     // }

     const createProduct = await this.createProductsService.execute({title, 
     desc, img, categories, size, color, price, inStock})
     return response.json(createProduct).status(201)
    }
}