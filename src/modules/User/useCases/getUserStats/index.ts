import { GetUserStatsController } from "./GetUserStatsController";
import { GetUserStatsService } from "./GetUserStatsService";

const getUserStatsService = new GetUserStatsService();
export const getUserStatsController = new GetUserStatsController(getUserStatsService);