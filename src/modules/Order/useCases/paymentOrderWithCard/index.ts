import { PaymentOrderWithCardController } from "./PaymentOrderWithCardController";
import { PaymentOrderWithCardService } from "./PaymentOrderWithCardCardService";

const paymentOrderWithCardService = new PaymentOrderWithCardService()
export const paymentOrderWithCardController= new PaymentOrderWithCardController(paymentOrderWithCardService);