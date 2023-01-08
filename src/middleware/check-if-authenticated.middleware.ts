import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import catchError from "http-errors";
import * as jwt from "jsonwebtoken";
import { UserInfo } from '../models/user-info.model';


export const checkIfAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const authJwtToken = req?.headers?.authorization?.split(' ')[1];

    if (!authJwtToken) {
        next(catchError(StatusCodes.FORBIDDEN, 'Invalid credentials.'));
        return;
    }

    verifyAuthJwtToken(authJwtToken)
       .then((userInfo: UserInfo) => {
            req['userInfo'] = userInfo;
            next();
            return;
    })
    .catch(err =>{
         next(catchError(StatusCodes.FORBIDDEN, `${err.message} - Invalid credentials.`));
         return;
    });
};


async function verifyAuthJwtToken(authJwtToken: string){
    return await jwt.verify(authJwtToken, process.env.JWT_SECRET_KEY!);
}