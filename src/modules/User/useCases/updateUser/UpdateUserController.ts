import { Request, Response } from "express";
import UpdateUserService from "./UpdateUserService";


export class UpdateUserController{
    constructor(private updateUserService: UpdateUserService ){}
    async handle(request: Request, response: Response){
        const {password} = request.body;
        const {id} = request.params;
        try {
            const updatePassword = await this.updateUserService.execute({id, password})
            updatePassword.password = undefined;
            response.status(200).json({updatePassword})
        } catch (err) {
            response.status(500).json(err);
        }
    }
}