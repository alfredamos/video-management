"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreValidationMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const genre_validation_1 = require("../validations/genre.validation");
const http_errors_1 = __importDefault(require("http-errors"));
const genreValidationMiddleware = (req, res, next) => {
    const { body: gen } = req;
    const genre = gen;
    const { error, value } = (0, genre_validation_1.genreValidation)(genre);
    if (error) {
        let errorMessages = [];
        for (const err of error.details) {
            errorMessages.push(err.message);
        }
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `${errorMessages} - please provide all values.`);
    }
    next();
    return value;
};
exports.genreValidationMiddleware = genreValidationMiddleware;
