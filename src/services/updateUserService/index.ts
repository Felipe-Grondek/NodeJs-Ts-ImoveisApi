import AppDataSource from "../../data-source";
import { Users } from "../../entities/users";
import { AppError } from "../../errors";
import { IUserUpdate, IUserPass, IUser } from "../../interfaces/users";
import { userReturnSchema } from "../../schemas/userSchemas";

const updateUserService = async (payload: IUserUpdate, userInParams: IUserPass, userLoggedId: string): Promise<IUser> => {
    
    const userRepo = AppDataSource.getRepository(Users);
    const userLogged = await userRepo.findOneBy({id: userLoggedId});

    if(!userLogged?.isAdm && userLoggedId !== userInParams.id) {
        throw new AppError(["non-admin user can change only own account"], 401)
    }

    const updatedUser = await userRepo.save({id: userInParams.id, ...payload});

    const returnUser = await userReturnSchema.validate(updatedUser, {
        stripUnknown: true
    }) as IUser;

    return returnUser;
};

export { updateUserService };