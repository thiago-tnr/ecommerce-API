import { UserVerificationService } from "../userVerification/UserVerificationService";
import { CreateUserController } from "./CreateUserController";
import CreateUserService from "./CreateUserService";

const createUserService = new CreateUserService();
const userVerificationService = new UserVerificationService();
export const createUserController = new CreateUserController(createUserService, userVerificationService)