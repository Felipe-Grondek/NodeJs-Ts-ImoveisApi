import { Router } from "express";
import { 
    createCategoriesController, 
    listAllCategoriesController, 
    listPropertiesOfCategoryController 
} from "../../controllers";
import { 
    validateAuthorizationTokenMiddleware, 
    validatePayloadMiddleware, 
    verifyCategoriesExistsMiddleware, 
    verifyUserIsAdmMiddleware
 } from "../../middlewares";
import { createCategoriesSchema } from "../../schemas/categoriesSchema";

const categoriesRoutes = Router();

categoriesRoutes.post("", validateAuthorizationTokenMiddleware, verifyUserIsAdmMiddleware, validatePayloadMiddleware(createCategoriesSchema), createCategoriesController);
categoriesRoutes.get("", listAllCategoriesController);
categoriesRoutes.get("/:id/properties", verifyCategoriesExistsMiddleware, listPropertiesOfCategoryController)

export { categoriesRoutes }