import AppError from "../../../../helpers/appError/AppError";
import Product from "../../infra/model/Product"

interface Request {
    getProductById: string    
}

export class GetProductService {
    async execute({getProductById}:Request) {
        const findProductById = await Product.findById(getProductById);

        if (!findProductById) {
            throw new AppError("Product not found", 404)
        }

        return findProductById;
    }
}