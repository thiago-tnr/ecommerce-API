import { GetProductController } from "./GetProductController";
import { GetProductService } from "./GetProductService";


const getProductService = new GetProductService();
export const getProductController = new GetProductController(getProductService);