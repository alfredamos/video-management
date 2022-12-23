"use strict";
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
exports.getMovieById = exports.getAllMovies = exports.editMovie = exports.deleteMovie = exports.createMovie = void 0;
const client_1 = require("@prisma/client");
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: newGen } = req;
    const newMovie = newGen;
    const genreId = newMovie.genreId;
    const genre = yield prisma.genre.findUnique({
        where: { id: genreId },
    });
    if (!genre) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Genre does not exist, please pick from the given list.");
    }
    const releaseDate = newMovie.releaseDate;
    if (typeof releaseDate === "string") {
        newMovie.releaseDate = new Date(releaseDate);
    }
    const movie = yield prisma.movie.create({
        data: Object.assign({}, newMovie),
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json(movie);
});
exports.createMovie = createMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const movie = yield prisma.movie.findUnique({
        where: { id },
    });
    if (!movie) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Movie with id = ${id} is not found.`);
    }
    const deletedMovie = yield prisma.movie.delete({
        where: { id },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(deletedMovie);
});
exports.deleteMovie = deleteMovie;
const editMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: genToEdit } = req;
    const movieToEdit = genToEdit;
    const { id } = req.params;
    const movie = yield prisma.movie.findUnique({
        where: { id },
    });
    if (!movie) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Movie with id = ${id} is not found.`);
    }
    const genreId = movieToEdit.genreId;
    const genre = yield prisma.genre.findUnique({
        where: { id: genreId },
    });
    if (!genre) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Genre does not exist, please pick from the given list.");
    }
    const releaseDate = movieToEdit.releaseDate;
    if (typeof releaseDate === "string") {
        movieToEdit.releaseDate = new Date(releaseDate);
    }
    const updatedMovie = yield prisma.movie.update({
        where: { id },
        data: Object.assign({}, movieToEdit),
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(updatedMovie);
});
exports.editMovie = editMovie;
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield prisma.movie.findMany({
        include: {
            genre: true,
        },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(movies);
});
exports.getAllMovies = getAllMovies;
const getMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const movie = yield prisma.movie.findUnique({
        where: { id },
        include: {
            genre: true,
        },
    });
    if (!movie) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Movie with id = ${id} is not found.`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(movie);
});
exports.getMovieById = getMovieById;
