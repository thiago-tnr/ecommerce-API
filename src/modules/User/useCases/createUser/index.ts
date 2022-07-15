import { CreateUserController } from "./CreateUserController";
import CreateUserService from "./CreateUserService";

const createUserService = new CreateUserService();
export const createUserController = new CreateUserController(createUserService)