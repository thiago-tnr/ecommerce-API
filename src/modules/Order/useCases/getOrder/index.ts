import { GetUserOrderController } from "./GetUserOrderController";
import { GetUserOrderService } from "./GetUserOrderService"

const getUserOrderService = new GetUserOrderService();
export const getUserOrderController = new GetUserOrderController(getUserOrderService)