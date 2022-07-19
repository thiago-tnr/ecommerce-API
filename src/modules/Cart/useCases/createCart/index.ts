import { CreateCartController } from "./CreateCartController";
import { CreateCartService } from "./CreateCartService";

const createCartService = new CreateCartService()
export const createCartController = new CreateCartController(createCartService)