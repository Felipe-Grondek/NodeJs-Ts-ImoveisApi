import { Request, Response } from "express";
import { IScheduleRequest } from "../../interfaces/schedules";
import { createScheduleService } from "../../services";

const createScheduleController = async (req:Request, res:Response) => {
    const schedule = await createScheduleService(req.validatedBody as IScheduleRequest, req.userId);

    return res.status(201).json(schedule);
};

export { createScheduleController };