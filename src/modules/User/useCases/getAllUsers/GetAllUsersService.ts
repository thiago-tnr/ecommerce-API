import AppError from "../../../../helpers/appError/AppError"
import User from "../../infra/models/User"

export default class GetAllUsersService {
    public async execute() {
        const findAllUsers = await User.find().sort({_id: -1}).limit(15)

        if (findAllUsers) {
            return findAllUsers
        } else {
            throw new AppError("Users not found", 404)
        }
    }
}