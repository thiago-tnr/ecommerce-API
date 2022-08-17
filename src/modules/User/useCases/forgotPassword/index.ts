import { ForgotPasswordController } from "./ForgotPasswordController";
import { ForgotPasswordService } from "./ForgotPasswordService";

const forgotPasswordService = new ForgotPasswordService()
export const forgotPasswordController = new ForgotPasswordController(forgotPasswordService);