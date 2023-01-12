import { Request, Response } from "express";
import { listAllPropertiesService } from "../../services";

const listAllPropertiesController = async (req:Request, res:Response) => {
    const properties = await listAllPropertiesService();

    return res.status(200).json(properties);
};

export { listAllPropertiesController };