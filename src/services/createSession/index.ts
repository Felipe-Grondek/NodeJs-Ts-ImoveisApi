import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors";
import { IUser, IUserLogin, IUserLoginReturn, IUserPass } from "../../interfaces/users";
import "dotenv/config"
import { userReturnSchema } from "../../schemas/userSchemas";

const createSessionService = async (payload: IUserLogin, repoUser: IUserPass): Promise<IUserLoginReturn> => {
    const passwordMatch = await compare(payload.password, repoUser.password);

    if(!passwordMatch) {
        throw new AppError(["wrong email/password"], 403)
    }

    const token = jwt.sign(
        { id: repoUser.id },
        process.env.SECRET_KEY as string,
        { expiresIn: "24h" }
    );

    const returnedUser = await userReturnSchema.validate(repoUser, {
        stripUnknown: true
    }) as IUser;

    return { token, user: {...returnedUser} };
};

export { createSessionService };