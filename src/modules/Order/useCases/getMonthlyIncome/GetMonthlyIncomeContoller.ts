import { Request, Response } from "express";
import { GetMonthlyIncomeService } from "./GetMonthlyIncomeService";

export class GetMonthlyIncomeController {

    constructor(private getMonthlyIncomeService: GetMonthlyIncomeService){}

    async handle(request: Request, response: Response) {
        const getIncomes = await this.getMonthlyIncomeService.execute()

        return response.status(200).json(getIncomes)
    }
}