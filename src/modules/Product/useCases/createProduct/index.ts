import { CreateProductController } from "./CreateProductController";
import { CreateProductsService } from "./CreateProductService";

const createProductsService = new CreateProductsService();
export const createProductController = new CreateProductController(createProductsService);