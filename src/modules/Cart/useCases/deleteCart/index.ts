import { DeleteCartService } from "./DeleteCartService";
import { DeleteCartController } from "./DeleteCartController";

const deleteCartService = new DeleteCartService();
export const deleteCartController = new DeleteCartController(deleteCartService);