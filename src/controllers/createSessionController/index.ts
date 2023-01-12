import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users";
import { createSessionService } from "../../services";

const createSessionController = async (req: Request, res: Response) => {
    const payload = req.validatedBody as IUserLogin;
    const repoUser = req.repoUser;
    const data = await createSessionService(payload, repoUser);

    return res.status(200).json(data);
};

export { createSessionController };