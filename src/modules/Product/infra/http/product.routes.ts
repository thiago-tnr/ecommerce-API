import { request, response, Router } from "express";
import { createProductController } from "../../useCases/createProduct";
import { deleteProductController } from "../../useCases/deleteProduct";
import { getProductController } from "../../useCases/getProduct";
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

productsRouter.delete('/delete-product/:id', (request, response) => {
    return deleteProductController.handle(request, response)    
})

productsRouter.get('/product/:id', (request, response) => {
    return getProductController.handle(request, response)
})