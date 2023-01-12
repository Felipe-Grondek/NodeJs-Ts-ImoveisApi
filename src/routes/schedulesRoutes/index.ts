import { Router } from "express";
import { createScheduleController, listScheduleOfPropertyController } from "../../controllers";
import { validateAuthorizationTokenMiddleware, validatePayloadMiddleware, verifyUserIsAdmMiddleware } from "../../middlewares";
import { scheduleRequestSchema } from "../../schemas/schedulesSchema";

const schedulesRoutes = Router();

schedulesRoutes.post("", validateAuthorizationTokenMiddleware, validatePayloadMiddleware(scheduleRequestSchema), createScheduleController);
schedulesRoutes.get("/properties/:id", validateAuthorizationTokenMiddleware, verifyUserIsAdmMiddleware, listScheduleOfPropertyController);

export { schedulesRoutes };