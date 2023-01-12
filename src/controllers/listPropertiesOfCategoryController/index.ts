import { Request, Response } from "express";
import { listPropertiesOfCategoryService } from "../../services";

const listPropertiesOfCategoryController = async (req:Request, res:Response) => {
    const properties = await listPropertiesOfCategoryService(req.params.id);

    return res.status(200).json(properties);
};

export { listPropertiesOfCategoryController };