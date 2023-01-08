import { Router } from "express";
import { checkIfAuthenticated } from '../middleware/check-if-authenticated.middleware';
import { checkIfAdmin } from '../middleware/check-if-admin.middleware';
import {
  deleteUser,
  getAllUsers,
  getUserById
} from "../controllers/user.controller";

const router = Router();

router.route('/')
      .get(checkIfAuthenticated, checkIfAdmin, getAllUsers);

router.route('/:id')
      .delete(checkIfAuthenticated, checkIfAdmin, deleteUser)
      .get(checkIfAuthenticated, checkIfAdmin, getUserById);

export default router;
