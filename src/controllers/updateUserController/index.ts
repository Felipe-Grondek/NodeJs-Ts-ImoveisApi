import { Request, Response } from "express";
import { updateUserService } from "../../services";

const updateUserController = async (req:Request, res:Response) => {
    const data = await updateUserService(req.validatedBody, req.userInParams, req.userId);

    return res.status(200).json(data);
};

export { updateUserController };