import { DeleteUserController } from "./DeleteUserController";
import DeleteUserService from "./DeleteUserService";

const deleteUserService = new DeleteUserService();
export const deleteUserController = new DeleteUserController(deleteUserService);