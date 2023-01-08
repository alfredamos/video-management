import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import { Response, Request, NextFunction } from "express";
import { UserType } from "@prisma/client";
import { UserInfo } from '../models/user-info.model';

export const checkIfAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req["userInfo"] as UserInfo;
  
  if (user?.userType !== UserType.Admin) {
    next(catchError(
      StatusCodes.UNAUTHORIZED,
      "You are not authorized to perform this task."
    ));

    return;
  }
  next();
};
