import { UpdateCartController } from "./UpdateCartController";
import { UpdateCartService } from "./UpdateCartService";


const updateCartService = new UpdateCartService();
export const updateCartController = new UpdateCartController(updateCartService);