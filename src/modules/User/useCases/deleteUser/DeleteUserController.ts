import { Request, Response } from "express";
import DeleteUserService from "./DeleteUserService";


export class DeleteUserController {
    constructor(private deleteUserService: DeleteUserService){}
    async handle(request: Request, response: Response) {
        const {id} = request.params;
        const delteUserById = await this.deleteUserService.execute({id})
        if (delteUserById) {
            return response.status(200).json({message: "User deleted sucssesfully"})
        }
    }
}