"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const movieSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    producer: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    youtubeId: joi_1.default.string().required(),
    starsCount: joi_1.default.number().required(),
    releaseDate: joi_1.default.string().required(),
    genreId: joi_1.default.string().required()
});
const movieValidation = (movie) => {
    const { title, producer, description, youtubeId, starsCount, releaseDate, genreId } = movie;
    return movieSchema.validate({
        title,
        producer,
        description,
        youtubeId,
        starsCount,
        releaseDate,
        genreId
    });
};
exports.movieValidation = movieValidation;
