import { Request, Response } from "express";
import { listAllCategoriesService } from "../../services";

const listAllCategoriesController = async (req:Request, res:Response) => {
    const categories = await listAllCategoriesService();

    return res.status(200).json(categories);
};

export { listAllCategoriesController };