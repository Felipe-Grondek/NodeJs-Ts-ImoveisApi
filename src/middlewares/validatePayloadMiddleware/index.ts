import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { AppError } from "../../errors";

const validatePayloadMiddleware = (schema: yup.AnyObjectSchema) => async (req:Request, res:Response, next:NextFunction) => {

    if(req.method == "PATCH" && req.baseUrl == "/users") {
        const keys = Object.keys(req.body)

        if(keys.some(k => k == "isAdm" || k == "isActive" || k == "id")) {
            throw new AppError(["only email name and password are editable"], 401)
        }
    }

    try {
        const validated = await schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        })

        req.validatedBody = validated;
        return next();

    } catch (error) {
        if(error instanceof yup.ValidationError) {
            throw new AppError(error.errors, 400)
        }
    }
};

export { validatePayloadMiddleware };