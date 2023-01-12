import AppDataSource from "../../data-source";
import { Users } from "../../entities/users";
import { AppError } from "../../errors";
import { IUserPass } from "../../interfaces/users";

const softDeleteUserService = async (user: IUserPass): Promise<object> => {
    if(!user.isActive) {
        throw new AppError(["this user already deactivated"], 400);
    }

    const userRepo = AppDataSource.getRepository(Users);

    await userRepo.save({ id: user.id, isActive: false });

    return {};
};

export { softDeleteUserService };