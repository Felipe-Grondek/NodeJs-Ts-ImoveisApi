import AppDataSource from "../../data-source"
import { Users } from "../../entities/users"
import { IUser } from "../../interfaces/users";
import { userListReturnSchema } from "../../schemas/userSchemas";

const getAllUsersService = async (): Promise<IUser[]> => {
    const userRepo = AppDataSource.getRepository(Users);
    const allUsers = await userRepo.find()

    const userListReturn = await userListReturnSchema.validate(allUsers, {
        stripUnknown: true
    }) as IUser[];

    return userListReturn;
}

export { getAllUsersService };