"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log("In errorHandler, error message", err.message);
    //console.log("In middleware, error : ", err);
    if (err.status === http_status_codes_1.StatusCodes.BAD_REQUEST ||
        err.status === http_status_codes_1.StatusCodes.NOT_FOUND) {
        return res.status(err.status).json({
            message: err.message,
        });
    }
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
    });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
