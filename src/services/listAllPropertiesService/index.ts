import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties";

const listAllPropertiesService = async () => {

    const propertiesRepo = AppDataSource.getRepository(Properties);
    const properties = await propertiesRepo.find();

    return properties;
};

export { listAllPropertiesService };