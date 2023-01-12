import { Router } from "express";
import { createPropertiesController, listAllPropertiesController } from "../../controllers";
import { validateAuthorizationTokenMiddleware, validatePayloadMiddleware, verifyCategoriesExistsMiddleware, verifyUserIsAdmMiddleware } from "../../middlewares";
import { requestPropertiesSchema } from "../../schemas/propertiesSchema";

const propertiesRoutes = Router();

propertiesRoutes.post("", validateAuthorizationTokenMiddleware, verifyUserIsAdmMiddleware, validatePayloadMiddleware(requestPropertiesSchema), verifyCategoriesExistsMiddleware, createPropertiesController);
propertiesRoutes.get("", listAllPropertiesController)

export { propertiesRoutes };