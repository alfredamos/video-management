"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const rating_model_1 = require("./rating.model");
class Movie {
    constructor() {
        this.isActive = false;
        this.pgRating = rating_model_1.Rating.Family;
    }
}
exports.Movie = Movie;
