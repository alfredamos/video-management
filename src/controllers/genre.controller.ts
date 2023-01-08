import { PrismaClient } from "@prisma/client";
import createdError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { Genre } from "../models/genre.model";

const prisma = new PrismaClient();

const createGenre = async (req: Request, res: Response) => {
  const { body: newGen } = req;

  const newGenre = newGen as Genre;

  const genre = await prisma.genre.create({
    data: { ...newGenre },
  });

  res.status(StatusCodes.CREATED).json(genre);
};

const deleteGenre = async (req: Request, res: Response) => {
  const { id } = req.params;

  const genre = await prisma.genre.findUnique({
    where: { id },
  });

  if (!genre) {
    throw createdError(
      StatusCodes.NOT_FOUND,
      `Genre with id = ${id} is not found.`
    );
  }

  const deletedGenre = await prisma.genre.delete({
    where: { id },
  });

  res.status(StatusCodes.OK).json(deletedGenre);
};

const editGenre = async (req: Request, res: Response) => {
  const { body: genToEdit } = req;

  const genreToEdit = genToEdit as Genre;

  const { id } = req.params;

  const genre = await prisma.genre.findUnique({
    where: { id },
  });

  if (!genre) {
    throw createdError(
      StatusCodes.NOT_FOUND,
      `Genre with id = ${id} is not found.`
    );
  }

  const updatedGenre = await prisma.genre.update({
    where: { id },
    data: { ...genreToEdit },
  });

  res.status(StatusCodes.OK).json(updatedGenre);
};

const getAllGenres = async (req: Request, res: Response) => {
  const genres = await prisma.genre.findMany({
    include: {
      movies: true,
    },
  });

  res.status(StatusCodes.OK).json(genres);
};

const getGenreById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const genre = await prisma.genre.findUnique({
    where: { id },
    include: {
      movies: true,
    },
  });

  if (!genre) {
    throw createdError(
      StatusCodes.NOT_FOUND,
      `Genre with id = ${id} is not found.`
    );
  }

  res.status(StatusCodes.OK).json(genre);
};

export { createGenre, deleteGenre, editGenre, getAllGenres, getGenreById };
