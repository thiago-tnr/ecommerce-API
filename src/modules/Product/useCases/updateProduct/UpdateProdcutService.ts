import AppError from "../../../../helpers/error/AppError";
import Product from "../../infra/model/Product";

interface Request {
    requestBody: any,
    productId: string
}

export class UpdateProductService {
    public async execute({requestBody, productId}: Request) {
        const product = await Product.findById(productId)
        if (product) {
            if (requestBody) {
                const updateProduct = await Product.findByIdAndUpdate(productId, 
                {$set: requestBody},
                {new: true})
                    if (updateProduct) {
                        return updateProduct;
                    }
                    throw new AppError("Prodcut don't updated", 406)
            }
        } else {
            throw new AppError("No products found with this ID", 404)
        }
    }
}