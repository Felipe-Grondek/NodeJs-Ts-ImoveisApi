import * as yup from "yup";

const scheduleRequestSchema = yup.object().shape({
    date: yup.string().required(),
    hour: yup.string().required(),
    propertyId: yup.string().required(),
    userId: yup.string()
});

export { scheduleRequestSchema };