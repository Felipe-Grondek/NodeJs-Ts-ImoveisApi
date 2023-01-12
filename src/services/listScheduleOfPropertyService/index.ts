import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties";
import { AppError } from "../../errors";

const listScheduleOfPropertyService = async (propertyId: string) => {
    const propertyRepo = AppDataSource.getRepository(Properties);

    const schedule = await propertyRepo.createQueryBuilder("properties")
    .where("properties.id = :propertyId", {propertyId})
    .innerJoinAndSelect("properties.schedules", "property_schedules")
    .innerJoinAndSelect("property_schedules.user", "schedules")
    .getOne()

    if(!schedule) {
        throw new AppError(["property not found"], 404);
    }

    return schedule
};

export { listScheduleOfPropertyService };