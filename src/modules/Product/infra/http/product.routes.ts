import { request, response, Router } from "express";
import { createProductController } from "../../useCases/createProduct";
import { deleteProductController } from "../../useCases/deleteProduct";
import { getProductController } from "../../useCases/getProduct";
import { updateProdcutController } from "../../useCases/updateProduct";
import multer from "multer";

export const productsRouter = Router();
const upload = multer({dest:"./tmp"});

productsRouter.get('/ping', (request, response) => {
    return response.json({message: "pong"});
})

productsRouter.post('/', upload.single("img"), (request, response) =>{
    const {img}:any = request;
    return createProductController.handle(request, response)
})

productsRouter.put('/:id', (request, response) =>{
    return updateProdcutController.handle(request, response)
})

productsRouter.delete('/:id', (request, response) => {
    return deleteProductController.handle(request, response)    
})