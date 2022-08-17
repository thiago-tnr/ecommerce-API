import { ResetPasswordController } from "./ResetPasswordController";
import { ResetPasswordService } from "./ResetPasswordService";

const resetPasswordService = new ResetPasswordService();
export const resetPasswordController = new ResetPasswordController(resetPasswordService);