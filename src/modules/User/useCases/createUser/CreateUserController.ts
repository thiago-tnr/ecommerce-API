import { Request, Response } from "express";
import CreateUserService from "./CreateUserService";

export class CreateUserController {
    constructor(private createUserService: CreateUserService){}
    async handle (request: Request, response: Response) {
        const {name, isAdmin, email, password} = request.body;
    try {
        const user = await this.createUserService.execute({name, email, password, isAdmin});
        user.password = undefined;
        response.status(201).json(user); 
      } catch (err) {
        response.status(500).json(err);
      }
    }
}