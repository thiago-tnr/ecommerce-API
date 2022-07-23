import { GetUserCartContrller } from "./GetUserCartController";
import { GetUserCartService } from "./GetUserCartService";


const getUserCartService = new GetUserCartService();
export const getUserCartContrller = new GetUserCartContrller(getUserCartService);