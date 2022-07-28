import { CreateOrderController } from "./CreateOrderController";
import { CreateOrderService } from "./CreateOrderService";


const createOrderService = new CreateOrderService();
export const createOrderController = new CreateOrderController(createOrderService);