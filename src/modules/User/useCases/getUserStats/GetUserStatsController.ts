import { Request, Response } from "express";
import { GetUserStatsService } from "./GetUserStatsService";


export class GetUserStatsController {
    constructor(private getUserStatusService: GetUserStatsService){}

    async handle(request: Request, response: Response){
        const userDataStats = await this.getUserStatusService.execute();
        return response.status(200).json(userDataStats)
    }
}