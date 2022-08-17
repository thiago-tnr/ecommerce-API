import { Request, Response } from "express";
import AppError from "../../../../helpers/error/AppError";
import { isEmpty } from "../../../../helpers/isEmpty/Empty";
import { GetUserCartService } from "./GetUserCartService";


export class GetUserCartContrller {
    constructor(private getUserCartService: GetUserCartService){}
    async handle(request: Request, response: Response) {
        const {userId} = request.params;
        if (!userId) {
            throw new AppError("Missing query params, set ID", 404)
        }
        const getUserCart = await this.getUserCartService.execute({userId})
        return response.status(200).json(getUserCart)
    }
}