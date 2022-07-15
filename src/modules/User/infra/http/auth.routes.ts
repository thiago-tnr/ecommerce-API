import { Router } from "express";
import { loginUserController } from "../../useCases/loginUser";

export const authRouter = Router();

authRouter.post('/', async (request, response) => {
   return loginUserController.handle(request, response)
})

