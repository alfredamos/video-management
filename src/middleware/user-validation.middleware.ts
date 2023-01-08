import { StatusCodes } from "http-status-codes";
import { userValidation } from "../validations/user.validation";
import { Request, Response, NextFunction } from "express";
import createdError from "http-errors";
import { User } from "../models/user.model";

export const userValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body: usa } = req;

  const user = usa as User;

  const { error, value } = userValidation(user);

  if (error) {    
    const errorMessages = error.details.map(err => err.message).join('. ');

    next(createdError(
      StatusCodes.BAD_REQUEST,
      `${errorMessages} - please provide all values.`
    ));
    return;
  }

  next();

  return value;
};
