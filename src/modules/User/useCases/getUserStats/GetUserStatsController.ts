import { Request, Response } from "express";
import { GetUserStatsService } from "./GetUserStatsService";


export class GetUserStatsController {
    constructor(private getUserStatusService: GetUserStatsService){}

    async handle(request: Request, response: Response){
        try {
            const userDataStats = await this.getUserStatusService.execute();
            response.status(200).json(userDataStats)
        } catch (err) {
            response.json(err)
        }
    }
}