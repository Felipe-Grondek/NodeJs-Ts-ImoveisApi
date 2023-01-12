import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/users";
import { createUserService } from "../../services";

const createUserController = async (req: Request, res: Response) => {
  const payload = req.validatedBody as IUserRequest;
  const data = await createUserService(payload);

  return res.status(201).json(data);
};

export { createUserController };
