import catchError from "http-errors";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.model";


const prisma = new PrismaClient();


const deleteUser = async(req: Request, res: Response) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      
    });

    if (!user) {
      throw catchError(
        StatusCodes.NOT_FOUND,
        `User with id = ${id} is not found.`
      );
    }

    await prisma.user.delete({
        where: {id},
    })

    res.status(StatusCodes.NO_CONTENT).json({message: 'User has been successfully deleted.'});
}


const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      userType: true,
      movies: true,
    },
  });

  res.status(StatusCodes.OK).json(users);
};


const getUserById = async (req: Request, res: Response) => {
    const {id} = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        userType: true,
        movies: true,
      },
    });

    if (!user){
        throw catchError(StatusCodes.NOT_FOUND, `User with id = ${id} is not found.`);
    }

    res.status(StatusCodes.OK).json(user);
};


export {
    deleteUser,
    getAllUsers,
    getUserById
}


