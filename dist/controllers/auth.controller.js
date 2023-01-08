"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpUser = exports.profileOfUserById = exports.profileOfUser = exports.loginUser = exports.changePasswordOfUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
const uuid_tool_1 = require("uuid-tool");
const prisma = new client_1.PrismaClient();
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: loginUser } = req;
    const userToLogin = loginUser;
    const { email, password } = userToLogin;
    const user = yield prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid credentials");
    }
    const hashedPassword = user.password;
    const isValid = yield bcrypt.compare(password, hashedPassword);
    if (!isValid) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid credentials");
    }
    const token = yield createJsonWebToken(user.id, user.name, user.userType);
    const userInfo = {
        id: user.id,
        name: user.name,
        userType: user.userType,
        token,
    };
    res.status(http_status_codes_1.StatusCodes.OK).json(userInfo);
});
exports.loginUser = loginUser;
const changePasswordOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: userChangePwd } = req;
    const userChangePassword = userChangePwd;
    const { email, oldPassword, newPassword, confirmPassword } = userChangePassword;
    //----> New password must match the confirm password.
    if (newPassword.normalize() !== confirmPassword.normalize()) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "new password does not match confirm password.");
    }
    const user = yield prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid credentials");
    }
    //----> Retrieve the old password from database
    const hashedPassword = user.password;
    const isValid = yield bcrypt.compare(oldPassword, hashedPassword); //----> Compare the old password with the password stored in the database.
    //----> Check the validity of password.
    if (!isValid) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid credentials");
    }
    //----> Hash the new password.
    const newHashedPassword = yield bcrypt.hash(newPassword, 10);
    //----> Store the new password in the database.
    const updatedUser = yield prisma.user.update({
        where: { email },
        data: Object.assign(Object.assign({}, user), { password: newHashedPassword }),
    });
    //----> Make a user object information.
    const userInfo = {
        id: updatedUser.id,
        name: updatedUser.name,
        userType: updatedUser.userType,
        message: "Password is changed successfully, please login.",
    };
    //----> Send the user information to client.
    res.status(http_status_codes_1.StatusCodes.OK).json(userInfo);
});
exports.changePasswordOfUser = changePasswordOfUser;
const profileOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: userInput } = req;
    const user = userInput;
    const { email, password, newPassword } = user;
    //---> Check if user exists already.
    const existingUser = yield prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid credentials");
    }
    //----> Check for the correctness of the user password.
    const isValid = yield bcrypt.compare(password, existingUser.password);
    if (!isValid) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid credentials");
    }
    //----> Hash the new password.
    const hashedPassword = yield bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    delete user.newPassword;
    //----> Store the new password in the database.
    const updatedUser = yield prisma.user.update({
        where: { email },
        data: Object.assign(Object.assign({}, user), { id: existingUser.id }),
    });
    //----> Make a user object information.
    const userInfo = {
        id: updatedUser.id,
        name: updatedUser.name,
        userType: updatedUser.userType,
        message: "Password is changed successfully, please login.",
    };
    //----> Send the user information to client.
    res.status(http_status_codes_1.StatusCodes.OK).json(userInfo);
});
exports.profileOfUser = profileOfUser;
const profileOfUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: userInput } = req;
    const { id } = req.params;
    const user = userInput;
    const { email, password, newPassword, id: userId } = user;
    //----> Check for correctness of id.
    let isEqual = uuid_tool_1.UuidTool.compare(id, userId);
    if (!isEqual) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Id mismatch");
    }
    //---> Check if user exists already.
    const existingUser = yield prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid credentials");
    }
    //----> Check for the correctness of the user password.
    const isValid = yield bcrypt.compare(password, existingUser.password);
    if (!isValid) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid credentials");
    }
    //----> Hash the new password.
    const hashedPassword = yield bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    delete user.newPassword;
    //----> Store the new password in the database.
    const updatedUser = yield prisma.user.update({
        where: { id },
        data: Object.assign({}, user),
    });
    //----> Make a user object information.
    const userInfo = {
        id: updatedUser.id,
        name: updatedUser.name,
        userType: updatedUser.userType,
        message: "Password is changed successfully, please login.",
    };
    //----> Send the user information to client.
    res.status(http_status_codes_1.StatusCodes.OK).json(userInfo);
});
exports.profileOfUserById = profileOfUserById;
const signUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: newUser } = req;
    const userToSignUp = newUser;
    const email = userToSignUp.email;
    const user = yield prisma.user.findUnique({
        where: { email },
    });
    if (user) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "User already exists.");
    }
    const hashedPassword = yield bcrypt.hash(userToSignUp.password, 10);
    userToSignUp.password = hashedPassword;
    const createdUser = yield prisma.user.create({
        data: Object.assign({}, userToSignUp),
    });
    //const token = await createJsonWebToken(createdUser.id, createdUser.fullName, createdUser.userType);
    const userInfo = {
        id: createdUser.id,
        name: createdUser.name,
        userType: createdUser.userType,
        message: "Signup is successful.",
    };
    res.status(http_status_codes_1.StatusCodes.CREATED).json(userInfo);
});
exports.signUpUser = signUpUser;
function createJsonWebToken(id, name, userType) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield jwt.sign({
            id,
            name,
            userType,
        }, process.env.JWT_SECRET_KEY, { expiresIn: "1hr" });
        return token;
    });
}
