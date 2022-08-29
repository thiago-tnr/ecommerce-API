import { Router } from "express";
import { getAllProductsController } from "../../useCases/getAllProduct";
import { getProductController } from "../../useCases/getProduct";


export const productsRouterNotAuth = Router();

productsRouterNotAuth.get('/ping', (request, response) => {
    return response.json({message: "pong"});
})

productsRouterNotAuth.get('/:id', (request, response) => {
    return getProductController.handle(request, response)
})

productsRouterNotAuth.get('/', (request, response) => {
    return getAllProductsController.handle(request, response)
})