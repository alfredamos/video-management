import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";

export const errorHandlerMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("In errorHandler, error message", err.message);
  //console.log("In middleware, error : ", err);

  if (
    err.status === StatusCodes.BAD_REQUEST ||
    err.status === StatusCodes.NOT_FOUND
  ) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message,
  });
};
