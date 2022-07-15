import Error from "../../../../error/AppError";
import User from "../../infra/model/User";


export class GetUserStatsService {
    public async execute(){
        const date = new Date;
        const lastYear = new Date(date.setFullYear(date.getFullYear() -1))
        try {
            const userStats =  await User.aggregate([
                { $match: { createdAt: { $gte: lastYear } } },
                {
                  $project: {
                    month: { $month: "$createdAt" },
                  },
                },
                {
                  $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                  },
                },
              ]);
        if (userStats) {
            return userStats
        } else {
            throw new Error("No client in this year", 404)
        }
        } catch (err) {
            throw new Error("Application Error", 500)
        }
    }
}