import { Router } from "express";
import { createSessionController, createUserController, getAllUsersController, softDeleteUserController, updateUserController } from "../../controllers";
import { validateAuthorizationTokenMiddleware, validatePayloadMiddleware, verifyUserExistsByParamsMiddleware, verifyUserExistsMiddleware, verifyUserIsAdmMiddleware } from "../../middlewares";
import { createSessionSchema, createUserSchema, updateUserSchema } from "../../schemas/userSchemas";


const userRoutes = Router();
const sessionRoutes = Router();

userRoutes.post("", validatePayloadMiddleware(createUserSchema),createUserController);
userRoutes.get("", validateAuthorizationTokenMiddleware, verifyUserIsAdmMiddleware, getAllUsersController);
userRoutes.patch("/:id", validateAuthorizationTokenMiddleware, verifyUserExistsByParamsMiddleware, validatePayloadMiddleware(updateUserSchema), updateUserController);
userRoutes.delete("/:id", validateAuthorizationTokenMiddleware, verifyUserIsAdmMiddleware, verifyUserExistsByParamsMiddleware, softDeleteUserController);

sessionRoutes.post("", validatePayloadMiddleware(createSessionSchema), verifyUserExistsMiddleware, createSessionController);

export { userRoutes, sessionRoutes };
