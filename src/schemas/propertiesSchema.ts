import * as yup from "yup";

const createAddressSchema = yup.object({
    district: yup.string().required(),
    zipCode: yup.string().required().max(8),
    number: yup.string(),
    city: yup.string().required(),
    state: yup.string().required().max(2)
});

const createPropertiesSchema = yup.object().shape({
    value: yup.number().required(),
    size: yup.number().required(),
    categoryId: yup.string().uuid(),
    addressId: yup.string().uuid()
});

const requestPropertiesSchema = yup.object().shape({
    value: yup.number().required(),
    size: yup.number().required(),
    categoryId: yup.string().uuid().required(),
    address: createAddressSchema
});


export { createAddressSchema, requestPropertiesSchema, createPropertiesSchema };