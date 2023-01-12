import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserLogin, IUserRequest, IUserUpdate } from "../interfaces/users";

const createUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  isAdm: yup.boolean().required(),
});

const userReturnSchema = yup.object().shape({
  updatedAt: yup.date(),
  createdAt: yup.date(),
  isActive: yup.boolean(),
  isAdm: yup.boolean(),
  email: yup.string().email(),
  name: yup.string(),
  id: yup.string().uuid(),
});

const createSessionSchema: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const userListReturnSchema = yup.array(userReturnSchema);

const updateUserSchema: SchemaOf<IUserUpdate> = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  password: yup.string()
})

export { createUserSchema, userReturnSchema, createSessionSchema, userListReturnSchema, updateUserSchema };
