import { StatusCodes } from "http-status-codes";
import { userLoginValidation } from "../validations/user-login.validation";
import { Request, Response, NextFunction } from "express";
import createdError from "http-errors";
import { User } from "../models/user.model";

export const userLoginValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body: usa } = req;

  const user = usa as User;

  const { error, value } = userLoginValidation(user);

  if (error) {
    let errorMessages: string;

    errorMessages = error.details.map((err) => err.message).join(". ");

    next(createdError(
      StatusCodes.BAD_REQUEST,
      `${errorMessages} - please provide all values.`
    ));
    return;
  }

  next();

  return value;
};
