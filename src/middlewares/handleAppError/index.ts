import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../../errors";

const handleAppError = (
    error: ErrorRequestHandler, 
    req: Request, 
    res: Response, 
    next: NextFunction) => {

    if(error instanceof AppError) {
        return res.status(error.statusCode).json({message: error.errors.length > 1 ? error.errors : error.errors[0]})
    }

    console.log(error);

    return res.status(500).json({
        message: "Internal server error"
    })
};

export { handleAppError };