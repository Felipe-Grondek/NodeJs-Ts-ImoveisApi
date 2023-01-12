import { Request, Response } from "express";
import { getAllUsersService } from "../../services";

const getAllUsersController = async (req:Request, res:Response) => {
    const data = await getAllUsersService();
    
    return res.status(200).json(data);
};

export { getAllUsersController };