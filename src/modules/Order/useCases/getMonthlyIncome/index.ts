import { GetMonthlyIncomeController } from "./GetMonthlyIncomeContoller";
import { GetMonthlyIncomeService } from "./GetMonthlyIncomeService";


const getMonthlyIncomeService = new GetMonthlyIncomeService();
export const getMonthlyIncomeController = new GetMonthlyIncomeController(getMonthlyIncomeService);