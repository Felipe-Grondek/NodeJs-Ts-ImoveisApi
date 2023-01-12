import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties";
import { SchedulesUsersProperties } from "../../entities/schedulesUsersProperties";
import { Users } from "../../entities/users";
import { AppError } from "../../errors";
import { IScheduleRequest } from "../../interfaces/schedules";

const createScheduleService = async (payload: IScheduleRequest, userId: string) => {
    const schedulesRepo = AppDataSource.getRepository(SchedulesUsersProperties);
    const propertiesRepo = AppDataSource.getRepository(Properties);
    const usersRepo = AppDataSource.getRepository(Users);

    const property = await propertiesRepo.findOneBy({id: payload.propertyId});

    if(!property) {
        throw new AppError(["this property not exists"], 404);
    }

    const user = await usersRepo.findOneBy({id: userId});

    if(!user) {
        throw new AppError(["invalid user"]);
    }

    const validHour = parseInt(payload.hour.split(":")[0])
    
    if(validHour < 8 || validHour >= 18) {
        throw new AppError(["the hour need to between 08:00 - 18:00"])
    }

    const today = new Date(payload.date).getDay().toString();
    
    if(today == "0" || today == "6" || today == "NaN") {
        throw new AppError(["invalid date format"]);
    }
    
    const completePayload = {
        date: payload.date,
        hour: payload.hour,
        property,
        user
    };

    const alreadySchedule = await schedulesRepo.createQueryBuilder("schedules_users_properties")
    .select("schedules_users_properties")
    .where("schedules_users_properties.propertyId = :propertyId", {propertyId: completePayload.property.id})
    .andWhere("schedules_users_properties.date = :date", {date: completePayload.date})
    .andWhere("schedules_users_properties.hour = :hour", {hour: completePayload.hour})
    .getOne()

    if(alreadySchedule) {
        throw new AppError(["already have schedule to this property"], 409)
    }

    const alreadyUserSchedule = await schedulesRepo.createQueryBuilder("schedules_users_properties")
    .select("schedules_users_properties")
    .where("schedules_users_properties.userId = :userId", {userId: completePayload.user.id})
    .andWhere("schedules_users_properties.date = :date", {date: completePayload.date})
    .andWhere("schedules_users_properties.hour = :hour", {hour: completePayload.hour})
    .getOne()

    if(alreadyUserSchedule) {
        throw new AppError(["already have a schedule to this hour"], 409)
    }

    const newSchedules = schedulesRepo.create(completePayload);

    await schedulesRepo.save(newSchedules);

    return {message: "schedule realized with successfully"}
}

export { createScheduleService };