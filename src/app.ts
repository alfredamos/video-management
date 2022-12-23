import express from "express";
require("express-async-errors");
import cors from "cors";
import dotenv from "dotenv";

import genreRouter from "../src/routes/genre.route";
import movieRouter from "../src/routes/movie.route";

import { notFoundRouteMiddleware } from "./middleware/not-found-route.middleware";
import { errorHandlerMiddleware } from "./middleware/error-handler.middleware";

dotenv.config();

const app = express();

const Port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/genres', genreRouter);
app.use('/api/movies', movieRouter);

app.use(notFoundRouteMiddleware);
app.use(errorHandlerMiddleware);

app.listen(Port, () => console.log(`App is running on ${Port}...`));


