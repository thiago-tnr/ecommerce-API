import { Request, Response } from "express";
import AppError from "../../../../helpers/appError/AppError";
import { isEmpty } from "../../../../helpers/empty/Empty";
import { UpdateCartService } from "./UpdateCartService";


export class UpdateCartController {
    constructor(private updateCartService: UpdateCartService){}
    async handle(request: Request, response: Response) {
        const dataToUpdate = request.body;
        const cartId = request.params.id

        if (isEmpty(dataToUpdate)) {
            throw new AppError('No data to update', 404);
        }

        if(!cartId) {
            throw new AppError('Missing params arg: ID', 400);
        }

        const cartUpdate = await this.updateCartService.execute({dataToUpdate, cartId});
        
       return response.status(200).json(cartUpdate)
    }
}