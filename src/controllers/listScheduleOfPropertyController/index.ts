import { Request, Response } from "express";
import { listScheduleOfPropertyService } from "../../services";

const listScheduleOfPropertyController = async (req:Request, res:Response) => {
    const schedule = await listScheduleOfPropertyService(req.params.id);

    return res.status(200).json(schedule);
};

export { listScheduleOfPropertyController };