import AppError from "../../../../helpers/appError/AppError";
import Order from "../../infra/model/Order";

interface Request{
    number: string,
    dueDate: string,
    codeValidation: string,
    orderId: string
}
export class PaymentOrderWithCardService{
    async execute({number, dueDate, codeValidation, orderId }: Request){
    
        if (isNaN(parseInt(codeValidation))) {
            throw new AppError('Check the numbers and resubmit, maybe the letters were passed as arguments', 403)
        } else {
            if(codeValidation.length !== 3){
                throw new AppError('validation code is wrong, please check your cards security code', 403)
            }
        }
        const validateDuaDate = dueDate.split('/');
        const month = parseInt(validateDuaDate[0]);
        const year = parseInt(validateDuaDate[1])

        if(month > 12 || month < 1) {
            throw new AppError('Card expiration date is invalid', 403)
        }

        if(year > 40 || year < 22) {
            throw new AppError('Card expiration date is invalid', 403)
        }
        
        const validateNumberCart = number.replace(/[^0-9]+/g, '');

        let cards = {
            visa      : /^4[0-9]{12}(?:[0-9]{3})/,
            mastercard : /^5[1-5][0-9]{14}/,
            diners    : /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
            amex      : /^3[47][0-9]{13}/,
            discover  : /^6(?:011|5[0-9]{2})[0-9]{12}/,
            hipercard  : /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
            elo        : /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
            jcb        : /^(?:2131|1800|35\d{3})\d{11}/,
            aura      : /^(5078\d{2})(\d{2})(\d{11})$/
        };
        
        function testarCC(validateNumberCart: string, cards: any) {
            for (let card in cards) 
                if (validateNumberCart.match(cards[card])) 
                    return card;
            return false;
        }
        
        let valid = validateNumberCart;
        let invalid = validateNumberCart;

         let cardIsValid;

        [valid, invalid].forEach(cartValid => 
            cardIsValid = (testarCC(cartValid, cards))
        );

        if (cardIsValid) {
            const orderPaiment = await Order.findById({_id: orderId})
                if(!orderPaiment) {
                    throw new AppError('An error occurred paying for this order', 402)
                } else {
                    if (orderPaiment.status === "Paied") {
                        throw new AppError('This order has already been paid', 403)
                    }
                    const orderWithNewStatus = await Order.updateOne({_id: orderId}, {status: "Paied"})

                    if (orderWithNewStatus){
                        const orderPaidStatus = await Order.findById({_id: orderId})
                        return [orderPaidStatus, cardIsValid]
                    } else {
                        throw new AppError('An error occurred paying for this order', 402)
                    }
                   
                }
        } else {
            throw new AppError('Payment denied', 403)
        }
    }
}