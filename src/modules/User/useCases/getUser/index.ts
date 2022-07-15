import { GetUserController } from "./GetUserController";
import GetUserService from "./GetUserService";


const getUserService = new GetUserService();
export const getUserController = new GetUserController(getUserService);