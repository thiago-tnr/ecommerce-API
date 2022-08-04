import { Request, Response } from "express";
import { GetAllOrdersService } from "./GetAllOrdersService";



export class GetAllOrdersController {
    constructor(private getAllOrdersService: GetAllOrdersService){}
    async handle(request: Request, response: Response) {
        const orders = await this.getAllOrdersService.execute();

        return response.status(200).json(orders)
    }
}