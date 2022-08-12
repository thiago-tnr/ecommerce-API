import { Router } from "express";
import { loginUserController } from "../../useCases/loginUser";
import path from 'path';
export const authRouter = Router();

authRouter.post('/', async (request, response) => {
   return loginUserController.handle(request, response)
})

authRouter.get('/verified/:id', async (request, response) => {
   response.sendFile(path.join(__dirname, "./../../../../view/verified.html"))
})
