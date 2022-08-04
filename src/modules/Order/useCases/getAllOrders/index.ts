import { GetAllOrdersController } from "./GetAllOrdersController";
import { GetAllOrdersService } from "./GetAllOrdersService";


const getAllOrdersService = new GetAllOrdersService();
export const getAllOrdersController = new GetAllOrdersController(getAllOrdersService)