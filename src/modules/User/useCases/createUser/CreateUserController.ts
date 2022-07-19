import { Request, Response } from "express";
import CreateUserService from "./CreateUserService";

/**
 * []validar os dados vindo do body
 * [] validar password
 * [] caracteres minimos para o password
 * [] regex para verificar se tem caracteres especiais
 * [] validar email
 */
export class CreateUserController {
    constructor(private createUserService: CreateUserService){}
    async handle (request: Request, response: Response) {
    const {name, isAdmin, email, password} = request.body;
    const user = await this.createUserService.execute({name, email, password, isAdmin});
    user.password = undefined;
    return response.status(201).json(user); 
  
    }
}