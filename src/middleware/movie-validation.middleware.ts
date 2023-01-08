import {StatusCodes} from "http-status-codes";
import {movieValidation} from "../validations/movie.validation";
import {Request, Response, NextFunction} from "express";
import createdError from "http-errors";
import {Movie} from "../models/movie.model";

export const movieValidationMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    const {body: mov} = req;

    const movie = mov as Movie;

    const {error, value} = movieValidation(movie);

    if (error){
        const errorMessages = error.details.map((err) => err.message).join(". ");

        next(createdError(StatusCodes.BAD_REQUEST, `${errorMessages} - please provide all values.`));
        return;
    }

    next();

    return value;
}