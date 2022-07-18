import { UpdateProdcutController } from "./UpdateProdcutController";
import { UpdateProductService } from "./UpdateProdcutService";


const updateProductService = new UpdateProductService();
export const updateProdcutController = new UpdateProdcutController(updateProductService)