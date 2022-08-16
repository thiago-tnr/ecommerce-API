import { Request, Response } from "express";
import { CreateUserVerificationService } from "./CreateUserVerificationService";
import CreateUserService from "./CreateUserService";

/**
 * []validar os dados vindo do body
 * [] validar password
 * [] caracteres minimos para o password
 * [] regex para verificar se tem caracteres especiais
 * [] validar email
 */
export class CreateUserController {
    constructor(
        private createUserService: CreateUserService, 
        private createUserVerificationService: CreateUserVerificationService){}

    async handle (request: Request, response: Response) {
    const {name, isAdmin, email, password} = request.body;
    const user = await this.createUserService.execute({name, email, password, isAdmin});

    let userId = user[1].toString();

    let sendEmail = await this.createUserVerificationService.execute({userId, email})
    
    if (sendEmail) {
        return response.status(202).json({"message" : "PENDDING"}); 
    }
  
    }
}

