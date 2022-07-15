import { Request, Response } from "express";
import GetUserService from "./GetUserService";
import dotenv from 'dotenv'

dotenv.config();

export class GetUserController{

    constructor(private getUserService: GetUserService){}

    async handle(request: Request, response: Response) {
        const {id} = request.params;
    try {
        const userById = await this.getUserService.execute({id})
        //@ts-ignore
        const { password, ...others } = userById._doc
        response.status(200).json({others}); 
    } catch (err) {
        response.status(500).json(err);
    }
    }
}