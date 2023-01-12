import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories";
import { ICategoryReturn } from "../../interfaces/categories";

const listAllCategoriesService = async (): Promise<ICategoryReturn[]> => {
    const categoriesRepository = AppDataSource.getRepository(Categories);

    const categories = await categoriesRepository.createQueryBuilder("categories")
    .getMany()

    return categories;
};

export { listAllCategoriesService };