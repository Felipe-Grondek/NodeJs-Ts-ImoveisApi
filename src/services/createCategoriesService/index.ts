import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories";
import { AppError } from "../../errors";
import { ICategoryRequest, ICategoryReturn } from "../../interfaces/categories";

const createCategoriesService = async (payload: ICategoryRequest): Promise<ICategoryReturn> => {
    const categoriesRepository = AppDataSource.getRepository(Categories);
    const category = await categoriesRepository.exist({where: { name: payload.name }});

    if(category) {
        throw new AppError(["category already exists"], 409)
    }

    const newCategory = categoriesRepository.create(payload);
    await categoriesRepository.save(newCategory);

    return newCategory;
}

export { createCategoriesService };