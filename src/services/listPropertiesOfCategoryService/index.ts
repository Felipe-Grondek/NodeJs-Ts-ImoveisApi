import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories";

const listPropertiesOfCategoryService = async (categoryId: string) => {
    const categoriesRepo = AppDataSource.getRepository(Categories);

    const properties = await categoriesRepo.findOne({
        where: {
            id: categoryId
        },
        relations: {
            properties: true
        }
    })

    return properties;
};

export { listPropertiesOfCategoryService };