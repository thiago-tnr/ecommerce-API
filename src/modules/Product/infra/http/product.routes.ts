import { Router } from "express";
import { createProductController } from "../../userCases/createProduct";

export const productsRouter = Router();

productsRouter.get('/ping', (request, response) => {
    return response.json({message: "pong"});
})

productsRouter.post('/', (request, response) =>{
    return createProductController.handle(request, response)
})