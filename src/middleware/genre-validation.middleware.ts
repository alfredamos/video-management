import {StatusCodes} from "http-status-codes";
import {genreValidation} from "../validations/genre.validation";
import {Request, Response, NextFunction} from "express";
import createdError from "http-errors";
import {Genre} from "../models/genre.model";

export const genreValidationMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    const {body: gen} = req;

    const genre = gen as Genre;

    const {error, value} = genreValidation(genre);

    if (error){
        let errorMessages: string[] = [];

        for (const err of error.details){
            errorMessages.push(err.message);
        }

        throw createdError(StatusCodes.BAD_REQUEST, `${errorMessages} - please provide all values.`);
    }

    next();

    return value;
}