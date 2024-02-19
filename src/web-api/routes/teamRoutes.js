// IMPORTS
import express from "express";
import {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  addPlayer,
} from "../controllers/teamController.js";
import { validateTeamFields } from "../middleware/validateMiddleware.js";

// ROUTES
const router = express.Router();

router.get("", getTeams);
router.get("/:id", getTeam)
router.post("", validateTeamFields, createTeam);
router.put("/:id", validateTeamFields, updateTeam);
router.put("/:id/add-player", addPlayer);

export { router as teamRouter };
