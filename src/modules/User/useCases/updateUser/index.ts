
import { UpdateUserController } from "./UpdateUserController";
import UpdateUserService from "./UpdateUserService";

const updateUserService = new UpdateUserService();
export const updateUserController = new UpdateUserController(updateUserService)
