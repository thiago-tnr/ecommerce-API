import { request, Router } from "express";
import { createProductController } from "../../useCases/createProduct";
import { updateProdcutController } from "../../useCases/updateProduct";

export const productsRouter = Router();

productsRouter.get('/ping', (request, response) => {
    return response.json({message: "pong"});
})

productsRouter.post('/', (request, response) =>{
    return createProductController.handle(request, response)
})

productsRouter.post('/update-product/:id', (request, response) =>{
    return updateProdcutController.handle(request, response)
})