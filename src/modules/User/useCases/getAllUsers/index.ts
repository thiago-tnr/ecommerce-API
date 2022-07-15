import { GetAllUsersController } from "./GetAllUsersController";
import GetAllUsersService from "./GetAllUsersService";



const getAllUsersService = new GetAllUsersService();
export const getAllUsersController = new GetAllUsersController(getAllUsersService);