import AppError from "../../../../helpers/error/AppError";
import User from "../../infra/models/User";


export class GetUserStatsService {
    public async execute(){
      const date = new Date;
      const lastYear = new Date(date.setFullYear(date.getFullYear() -1))
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
          throw new AppError("No client in this year", 404)
      }
    }
}