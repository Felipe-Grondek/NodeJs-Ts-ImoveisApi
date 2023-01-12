import { Request, Response } from "express";
import { ICategoryRequest } from "../../interfaces/categories"
import { createCategoriesService } from "../../services";

const createCategoriesController = async (req:Request, res:Response) => {
    const category = await createCategoriesService(req.validatedBody as ICategoryRequest);

    return res.status(201).json(category)
}

export { createCategoriesController };