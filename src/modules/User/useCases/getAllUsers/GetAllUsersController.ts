import { Request, Response } from "express";
import GetUserService from "./GetAllUsersService";
import dotenv from 'dotenv'

dotenv.config();

export class GetAllUsersController{

    constructor(private getUserService: GetUserService){}

    async handle(request: Request, response: Response) {
        const usersRegistered = await this.getUserService.execute()
        usersRegistered.forEach((user)=>{
            user.password = undefined
        })
        return response.status(200).json(usersRegistered); 
    }
}