import { IPropertyRequest } from "../../interfaces/properties";
import { IUserLogin, IUserPass, IUserRequest, IUserUpdate } from "../../interfaces/users";

declare global {
    namespace Express {
        interface Request {
            validatedBody: IUserRequest | IUserLogin | IUserUpdate;
            repoUser: IUserPass;
            userId: string;
            userInParams: IUserPass;
        }
    }
}

export {};