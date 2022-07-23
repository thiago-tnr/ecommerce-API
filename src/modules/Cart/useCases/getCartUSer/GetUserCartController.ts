import { Request, Response } from "express";
import { isEmpty } from "../../../../helpers/isEmpty/Empty";
import { GetUserCartService } from "./GetUserCartService";


export class GetUserCartContrller {
    constructor(private getUserCartService: GetUserCartService){}
    async handle(request: Request, response: Response) {
        const {userId} = request.params;
        if (!userId) {
            return response.status(404).json("Missing query params, set ID")
        }
        const getUserCart = await this.getUserCartService.execute({userId})
        return response.status(200).json(getUserCart)
    }
}