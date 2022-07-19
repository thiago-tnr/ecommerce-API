import { DeleteProductContrller } from "./DeleteProdcutController";
import { DeleteProductService } from "./DeleteProdcutService";


const deleteProductService = new DeleteProductService();
export const deleteProductController = new DeleteProductContrller(deleteProductService);