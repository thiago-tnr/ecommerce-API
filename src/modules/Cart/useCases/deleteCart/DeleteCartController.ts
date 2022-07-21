import { Request, Response } from "express";
import { isEmpty } from "../../../../helpers/isEmpty/Empty";
import { DeleteCartService } from "./DeleteCartService";

export class DeleteCartController {
    
    constructor(private deleteCartService: DeleteCartService){}

    async handle(request: Request, response: Response){
        const cartId = request.params.id;

        if (isEmpty(cartId)) {
            return response.status(400).json("No Id set in params")
        }
        const cartDeleted = await this.deleteCartService.execute({cartId})
        return response.status(200).json({"Successfully deleted": cartDeleted})
    }

}