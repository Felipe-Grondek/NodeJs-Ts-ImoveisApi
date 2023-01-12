import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users";
import { AppError } from "../../errors";

const verifyUserIsAdmMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    const userRepo = AppDataSource.getRepository(Users);

    const user = await userRepo.findOneBy({id: req.userId});

    if(!user?.isAdm) {
        throw new AppError(["user not have admin permission"], 403);
    }

    return next();
};

export { verifyUserIsAdmMiddleware };