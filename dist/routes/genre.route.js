"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genre_validation_middleware_1 = require("../middleware/genre-validation.middleware");
const genre_controller_1 = require("../controllers/genre.controller");
const router = (0, express_1.Router)();
router.route('/')
    .get(genre_controller_1.getAllGenres)
    .post(genre_validation_middleware_1.genreValidationMiddleware, genre_controller_1.createGenre);
router.route('/:id')
    .delete(genre_controller_1.deleteGenre)
    .get(genre_controller_1.getGenreById)
    .patch(genre_validation_middleware_1.genreValidationMiddleware, genre_controller_1.editGenre);
exports.default = router;
