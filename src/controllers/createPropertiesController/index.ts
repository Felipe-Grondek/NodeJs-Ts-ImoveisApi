import { Request, Response } from "express";
import { IPropertyRequest } from "../../interfaces/properties";
import { createPropertiesService } from "../../services";

const createPropertiesController = async (req:Request, res:Response) => {
    const property = await createPropertiesService(req.validatedBody as  IPropertyRequest);

    return res.status(201).json(property);
}

export { createPropertiesController };