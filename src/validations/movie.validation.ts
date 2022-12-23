import Joi from "joi";
import { Movie } from "../models/movie.model";

const movieSchema = Joi.object({
    title: Joi.string().required(), 
    producer: Joi.string().required(), 
    description: Joi.string().required(), 
    youtubeId: Joi.string().required(), 
    starsCount: Joi.number().required(), 
    releaseDate: Joi.string().required(), 
    genreId: Joi.string().required()
    
})

export const movieValidation = (movie: Movie) => {
    const {
        title, 
        producer, 
        description, 
        youtubeId, 
        starsCount, 
        releaseDate,
        genreId
    } = movie;
    
    return movieSchema.validate({
        title, 
        producer, 
        description, 
        youtubeId, 
        starsCount, 
        releaseDate,
        genreId
    });
}