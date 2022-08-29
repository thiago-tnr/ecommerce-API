import AppError from "../../../../helpers/appError/AppError";
import Product from "../../infra/model/Product";
   
interface Request {
     //@ts-ignore
    getLatestProducts: ParsedQs | any;
      //@ts-ignore
    getProductByCategory:  ParsedQs | any;
}

export class GetAllProductsService{
    async execute({getLatestProducts, getProductByCategory }:Request){
        let products;

        if(getLatestProducts) {
            products = await Product.find().sort({ createdAt: -1 }).limit(10);
        } else if (getProductByCategory) {
            products = await Product.find({categories: {$in : [getProductByCategory]}})
        } else {
            products = await Product.find();
        }
        
        if (!products) {
            throw new AppError("Productd not found", 404)
        } else {
            return products;
        }
    }
}