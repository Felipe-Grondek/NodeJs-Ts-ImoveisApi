import AppDataSource from "../../data-source";
import { Users } from "../../entities/users";
import { AppError } from "../../errors";
import { IUser, IUserRequest } from "../../interfaces/users";
import { userReturnSchema } from "../../schemas/userSchemas";

const createUserService = async (payload: IUserRequest): Promise<IUser> => {
    const userRepo = AppDataSource.getRepository(Users);
    const user = await userRepo.exist({where: { email: payload.email }});

    if(user) {
        throw new AppError(["user already exists"], 409)
    }

    const newUser = userRepo.create(payload);
    const createdUser = await userRepo.save(newUser);

    const returnedUser = await userReturnSchema.validate(createdUser, {
        stripUnknown: true,        
    }) as IUser;

    return returnedUser;
}

export { createUserService };