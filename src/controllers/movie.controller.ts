import { PrismaClient } from "@prisma/client";
import createdError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { Movie } from "../models/movie.model";

const prisma = new PrismaClient();

const createMovie = async (req: Request, res: Response) => {
  const { body: newGen } = req;

  const newMovie = newGen as Movie;

  const genreId = newMovie.genreId;
  const genre = await prisma.genre.findUnique({
    where: { id: genreId },
  });

  if (!genre) {
    throw createdError(
      StatusCodes.NOT_FOUND,
      "Genre does not exist, please pick from the given list."
    );
  }

  const releaseDate = newMovie.releaseDate;

  if (typeof releaseDate === "string") {
    newMovie.releaseDate = new Date(releaseDate);
  }

  const movie = await prisma.movie.create({
    data: { ...newMovie },
  });

  res.status(StatusCodes.CREATED).json(movie);
};

const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;

  const movie = await prisma.movie.findUnique({
    where: { id },
  });

  if (!movie) {
    throw createdError(
      StatusCodes.NOT_FOUND,
      `Movie with id = ${id} is not found.`
    );
  }

  const deletedMovie = await prisma.movie.delete({
    where: { id },
  });

  res.status(StatusCodes.OK).json(deletedMovie);
};

const editMovie = async (req: Request, res: Response) => {
  const { body: genToEdit } = req;

  const movieToEdit = genToEdit as Movie;

  const { id } = req.params;

  const movie = await prisma.movie.findUnique({
    where: { id },
  });

  if (!movie) {
    throw createdError(
      StatusCodes.NOT_FOUND,
      `Movie with id = ${id} is not found.`
    );
  }

  const genreId = movieToEdit.genreId;
  const genre = await prisma.genre.findUnique({
    where: { id: genreId },
  });

  if (!genre) {
    throw createdError(
      StatusCodes.NOT_FOUND,
      "Genre does not exist, please pick from the given list."
    );
  }

  const releaseDate = movieToEdit.releaseDate;
  if (typeof releaseDate === "string") {
    movieToEdit.releaseDate = new Date(releaseDate);
  }

  const updatedMovie = await prisma.movie.update({
    where: { id },
    data: { ...movieToEdit },
  });

  res.status(StatusCodes.OK).json(updatedMovie);
};

const getAllMovies = async (req: Request, res: Response) => {
  const movies = await prisma.movie.findMany({
    include: {
      genre: true,
    },
  });

  res.status(StatusCodes.OK).json(movies);
};

const getMovieById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const movie = await prisma.movie.findUnique({
    where: { id },
    include: {
      genre: true,
    },
  });

  if (!movie) {
    throw createdError(
      StatusCodes.NOT_FOUND,
      `Movie with id = ${id} is not found.`
    );
  }

  res.status(StatusCodes.OK).json(movie);
};

export { createMovie, deleteMovie, editMovie, getAllMovies, getMovieById };
