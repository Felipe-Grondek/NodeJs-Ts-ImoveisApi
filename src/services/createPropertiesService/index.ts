import AppDataSource from "../../data-source";
import { Addreses } from "../../entities/addreses";
import { Properties } from "../../entities/properties";
import { AppError } from "../../errors";
import { IPropertyRequest } from "../../interfaces/properties";
import { createAddressSchema, createPropertiesSchema } from "../../schemas/propertiesSchema";

const createPropertiesService = async (payload: IPropertyRequest) => {

    const propertiesPayload = await createPropertiesSchema.validate(payload, {
        stripUnknown: true,
        abortEarly: false
    });

    const addressPayload = await createAddressSchema.validate(payload.address, {
        stripUnknown: true,
        abortEarly: false
    });

    const propertiesRepo = AppDataSource.getRepository(Properties);
    const addresesRepo = AppDataSource.getRepository(Addreses);

    const propertyExist = await addresesRepo.findOneBy({
        zipCode: addressPayload.zipCode,
        district: addressPayload.district,
        number: addressPayload.number,
        city: addressPayload.city,
        state: addressPayload.state
    });

    if(propertyExist) {
        throw new AppError(["this property already exits"], 409)
    }

    const newAdress = addresesRepo.create(addressPayload);
    await addresesRepo.save(newAdress);

    const newProperty = propertiesRepo.create({...propertiesPayload, category: propertiesPayload.categoryId, address: newAdress});

    const returnProperty = await propertiesRepo.save(newProperty);

    return returnProperty;
};

export { createPropertiesService };