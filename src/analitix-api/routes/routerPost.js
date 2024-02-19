import express from "express";
import { uploadAll, uploadAllMatches, uploadChampionMastery, uploadPlayerInfo, uploadRankedInfo } from "../controllers/postController.js";

const router = express.Router();

router.post('/player/:name/:region', uploadPlayerInfo);
router.post('/all/:name/:region', uploadAll);
router.post('/matches/:id/:region', uploadAllMatches);
router.post('/rankeds/:id/:region', uploadRankedInfo);
router.post('/masteries/:id/:region', uploadChampionMastery);

export default router 