import { UpdateOrderController } from "./UpdateOrderController";
import { UpdateOrderService } from "./UpdateOrderService";


const updateOrderService = new UpdateOrderService();
export const updateOrderController = new UpdateOrderController(updateOrderService)