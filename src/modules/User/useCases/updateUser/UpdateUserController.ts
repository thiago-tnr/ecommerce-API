import { Request, Response } from "express";
import UpdateUserService from "./UpdateUserService";


export class UpdateUserController{
    constructor(private updateUserService: UpdateUserService ){}
    async handle(request: Request, response: Response){
        const {password} = request.body;
        const {id} = request.params;
        const updatePassword = await this.updateUserService.execute({id, password})
        updatePassword.password = undefined;
        return response.status(200).json({updatePassword})
    }
}