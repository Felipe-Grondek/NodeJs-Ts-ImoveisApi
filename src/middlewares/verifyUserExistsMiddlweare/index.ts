import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source"
import { Users } from "../../entities/users"
import { AppError } from "../../errors";

const verifyUserExistsMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    const userRepo = AppDataSource.getRepository(Users);
    const user = await userRepo.findOneBy({email: req.validatedBody.email });

    
    if(!user) {
        throw new AppError(["this user not exists"], 404)
    }

    if(user.isActive === false) {
        throw new AppError(["this user not exists"], 400)
    }

    req.repoUser = user;

    return next();
}

export { verifyUserExistsMiddleware };