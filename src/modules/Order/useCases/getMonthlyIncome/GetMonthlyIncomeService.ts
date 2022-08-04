import AppError from "../../../../helpers/error/AppError";
import Order from "../../infra/model/Order";

export class GetMonthlyIncomeService {

    async execute(){

        const date = new Date();

        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                month: { $month: "$createdAt" },
                sales: "$amount",
                },
            },
            {
                $group: {
                _id: "$month",
                total: { $sum: "$sales" },
                },
            },
        ]);

        if (!income) {
            throw new AppError('No incomes found', 404)
        }

        return income;
    }
}