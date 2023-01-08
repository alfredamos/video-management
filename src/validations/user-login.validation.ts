import Joi from "joi";
import { User } from "../models/user.model";

const userLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(), 
});

export const userLoginValidation = (user: User) => {
  const { email, password } = user;

  return userLoginSchema.validate({
    email,
    password,
  });
};
