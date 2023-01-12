import { Request, Response } from "express";
import { softDeleteUserService } from "../../services";

const softDeleteUserController = async (req:Request, res:Response) => {
    const data = await softDeleteUserService(req.userInParams);

    return res.status(204).json(data);
};

export { softDeleteUserController };