"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_validation_middleware_1 = require("../middleware/movie-validation.middleware");
const movie_controller_1 = require("../controllers/movie.controller");
const router = (0, express_1.Router)();
router.route('/')
    .get(movie_controller_1.getAllMovies)
    .post(movie_validation_middleware_1.movieValidationMiddleware, movie_controller_1.createMovie);
router.route('/:id')
    .delete(movie_controller_1.deleteMovie)
    .get(movie_controller_1.getMovieById)
    .patch(movie_validation_middleware_1.movieValidationMiddleware, movie_controller_1.editMovie);
exports.default = router;
