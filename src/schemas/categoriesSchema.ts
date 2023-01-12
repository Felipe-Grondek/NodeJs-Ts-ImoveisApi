import * as yup from "yup";

const createCategoriesSchema = yup.object().shape({
    name: yup.string().required()
});

const returnCategoriesSchema = yup.object().shape({
    name: yup.string(),
    id: yup.string().uuid()
});

export { createCategoriesSchema, returnCategoriesSchema };