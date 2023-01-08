"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_validation_1 = require("../validations/user.validation");
const http_errors_1 = __importDefault(require("http-errors"));
const userValidationMiddleware = (req, res, next) => {
    const { body: usa } = req;
    const user = usa;
    const { error, value } = (0, user_validation_1.userValidation)(user);
    if (error) {
        const errorMessages = error.details.map(err => err.message).join('. ');
        next((0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `${errorMessages} - please provide all values.`));
        return;
    }
    next();
    return value;
};
exports.userValidationMiddleware = userValidationMiddleware;
