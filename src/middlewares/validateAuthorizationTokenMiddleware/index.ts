import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../../errors";

interface IUserId extends JwtPayload {
    id: string;
}

const validateAuthorizationTokenMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const authToken = req.headers.authorization;

    if(!authToken) {
        throw new AppError(["missing authorization token"], 401);
    }

    const token = authToken.split(" ")[1];

    return verify(token, process.env.SECRET_KEY!, (err, decoded) => {
        if(err) {
            throw new AppError([err.message], 401);
        }

        const userId = decoded as IUserId;
        req.userId = userId.id;

        return next();
    });
};

export { validateAuthorizationTokenMiddleware };