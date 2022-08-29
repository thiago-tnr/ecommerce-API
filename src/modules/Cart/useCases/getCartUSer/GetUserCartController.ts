import { Request, Response } from "express";
import AppError from "../../../../helpers/appError/AppError";
import { isEmpty } from "../../../../helpers/empty/Empty";
import { GetUserCartService } from "./GetUserCartService";


export class GetUserCartContrller {
    constructor(private getUserCartService: GetUserCartService){}
    async handle(request: Request, response: Response) {
        const {id} = request.params;
        if (!id) {
            throw new AppError("Missing query params, set ID", 404)
        }
        const getUserCart = await this.getUserCartService.execute({id})
        return response.status(200).json(getUserCart)
    }
}