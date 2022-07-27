import { Request, Response } from "express";
import { isEmpty } from "../../../../helpers/isEmpty/Empty";
import { UpdateCartService } from "./UpdateCartService";


export class UpdateCartController {
    constructor(private updateCartService: UpdateCartService){}
    async handle(request: Request, response: Response) {
        const dataToUpdate = request.body;
        const cartId = request.params.id

        if (isEmpty(dataToUpdate)) {
            return response.status(404).json('No data to update');
        }

        if(!cartId) {
            return response.status(401).json('Missing params arg: ID');
        }

        const cartUpdate = await this.updateCartService.execute({dataToUpdate, cartId});
        
       return response.status(200).json(cartUpdate)
    }
}