import { string } from "joi";
import {Rating} from "./rating.model";

export class Movie {
    id?: string;
    title!: string;
    producer!: string;
    description!: string;
    youtubeId!: string;
    isActive?: boolean = false;   
    starsCount!: number;
    genreId?: string;
    releaseDate!: Date;
    lastUpdated?:Date;
    pgRating?: Rating = Rating.Family;
        
}