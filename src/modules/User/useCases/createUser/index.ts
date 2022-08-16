import { CreateUserVerificationService } from "./CreateUserVerificationService";
import { CreateUserController } from "./CreateUserController";
import CreateUserService from "./CreateUserService";

const createUserService = new CreateUserService();
const createUserVerificationService = new CreateUserVerificationService();
export const createUserController = new CreateUserController(createUserService, createUserVerificationService)