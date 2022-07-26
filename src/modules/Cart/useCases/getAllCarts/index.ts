import { GetAllCartsController } from "./GetAllCartsController";
import { GetAllCartsService } from "./GetAllCartsService";


const getAllCartService = new GetAllCartsService();
export const getAllCartsController = new GetAllCartsController(getAllCartService);