import AppError from "../../../../helpers/error/AppError";
import Product from "../../infra/model/Product"

interface Request{
    productId: string
}

export class DeleteProductService {
    public async execute({productId}: Request){
        const findProductById = await Product.findById(productId)
        if (findProductById === null) {
            throw new AppError("Product not found", 404)
        }
        const findAndDeleteProductById = await Product.findByIdAndDelete(productId);
        if (findAndDeleteProductById === null ) {
            throw new AppError("Not possible to delete product", 500)
        }
        return findAndDeleteProductById;
    }    
}