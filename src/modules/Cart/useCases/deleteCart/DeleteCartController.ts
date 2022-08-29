import { Request, Response } from "express";
import AppError from "../../../../helpers/appError/AppError";
import { isEmpty } from "../../../../helpers/empty/Empty";
import { DeleteCartService } from "./DeleteCartService";

export class DeleteCartController {
    
    constructor(private deleteCartService: DeleteCartService){}

    async handle(request: Request, response: Response){
        const cartId = request.params.id;

        if (isEmpty(cartId)) {
            throw new AppError("No Id set in params", 400)
        }
        const cartDeleted = await this.deleteCartService.execute({cartId})
        return response.status(200).json({"Successfully deleted": cartDeleted})
    }

}