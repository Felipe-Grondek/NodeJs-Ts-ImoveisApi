import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users";
import { AppError } from "../../errors";

const verifyUserExistsByParamsMiddleware =  async (req:Request, res:Response, next:NextFunction) => {
    const userRepo = AppDataSource.getRepository(Users);
    const userInParams = await userRepo.findOneBy({id: req.params.id });

    if(!userInParams) {
        throw new AppError(["this user not exists"], 404)
    }
    
    req.userInParams = userInParams;

    return next();
};

export { verifyUserExistsByParamsMiddleware };