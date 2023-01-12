import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories";
import { AppError } from "../../errors";
import { IPropertyRequest } from "../../interfaces/properties";

const verifyCategoriesExistsMiddleware = async (req:Request, res:Response, next:NextFunction) => {

    if(req.route.path !== "/:id/properties") {
        const { categoryId } = req.validatedBody as IPropertyRequest;
        req.params.id = categoryId;
    }

    const categoriesRepo = AppDataSource.getRepository(Categories);

    const categoryExist = await categoriesRepo.findOneBy({id : req.params.id});

    if(!categoryExist) {
        throw new AppError(["category not found"], 404);
    }

    return next()
}

export { verifyCategoriesExistsMiddleware };