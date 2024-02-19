import express from "express";
import { getChampionMasteryInfo, getMatchInfo, getMatchesInfo, getRankedInfo, getSummonerInfo } from "../controllers/getController.js";

const router = express.Router();

router.get('/players/:id', getSummonerInfo);
router.get('/players/rankeds/:id', getRankedInfo);
router.get('/players/masteries/:id', getChampionMasteryInfo);
router.get('/players/matches/:id/:number', getMatchesInfo);
router.get('/matches/:id', getMatchInfo);

export default router