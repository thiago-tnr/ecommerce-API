import { LoginUserController } from "./LoginUserController";
import LoginUserService from "./LoginUserService";


const loginUserService = new LoginUserService();
export const loginUserController = new LoginUserController(loginUserService)