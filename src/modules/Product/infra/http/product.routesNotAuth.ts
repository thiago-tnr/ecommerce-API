import { Router } from "express";
import { getAllProductsController } from "../../useCases/getAllProduct";
import { getProductController } from "../../useCases/getProduct";


export const productsRouterNotAuth = Router();

productsRouterNotAuth.get('/ping', (request, response) => {
    return response.json({message: "pong"});
})

productsRouterNotAuth.get('/product/:id', (request, response) => {
    return getProductController.handle(request, response)
})

productsRouterNotAuth.get('/products/all', (request, response) => {
    return getAllProductsController.handle(request, response)
})