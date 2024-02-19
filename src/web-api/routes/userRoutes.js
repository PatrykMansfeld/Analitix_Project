// IMPORTS
import express from "express";

import {
  getUsers,
  registerUser,
  loginUser,
} from "../controllers/userController.js";
import { validateUserFields } from "../middleware/validateMiddleware.js";

// ROUTES
const router = express.Router();

// GET USERS
router.get("", getUsers);

// REGISTER USER
router.post("/register", validateUserFields, registerUser);

// LOGIN USER
router.post("/login", loginUser);

export { router as userRouter };
