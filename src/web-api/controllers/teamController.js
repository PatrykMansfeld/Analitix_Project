import asyncHandler from "express-async-handler";
import { Team } from "../models/team.model.js";
import { User } from "../models/user.model.js";

// @desc    Get teams
// @route   GET /api/teams
// @access  Private
const getTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find({});

  res.status(200).json(teams);
});

// @desc Create team
// @route POST /api/teams
// @access Private
const createTeam = asyncHandler(async (req, res) => {
  const { name, coachId } = req.body;

  const teamExists = await Team.findOne({ name });
  if (teamExists) {
    res.status(400);
    throw new Error("Team already exists");
  } else {
    const team = await Team.create({
      name,
      coachId,
    }).catch((err) => {
      res.status(400);
      throw new Error("Could not create team");
    });

    const user = await User.findById(coachId);
    if (!user) {
      res.status(404);
      throw new Error("Coach not found");
    }

    user.teamId = team._id;
    await user.save();

    res.status(201).json(team);
  }
});

// @desc    Update team
// @route   PUT /api/teams/:id
// @access  Private
const updateTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    res.status(404);
    throw new Error("Team not found");
  }

  const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).catch((err) => {
    res.status(400);
    throw new Error("Could not update team");
  });

  res.status(200).json(updatedTeam);
});

// @desc    Add team player
// @route   PUT /api/teams/:id/add-player/
// @access  Private
const addPlayer = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    res.status(404);
    throw new Error("Team not found");
  }

  const user = await User.findOne({
    name: req.body.playerName,
    region: req.body.playerRegion,
    accountType: "player",
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  console.log(`User: ${user._id}`);
  console.log(`Team: ${team.players}`);

  const playerExists = await Team.find({
    players: user.analitixId,
  });

  console.log("Player exists: ");
  console.log(playerExists);

  if (playerExists.length > 0) {
    res.status(400);
    throw new Error("Player is already in team");
  }

  user.teamId = team._id;
  await user.save();

  team.players.push(user.analitixId);
  await team.save();

  res.status(200).json(team);
});

// @desc Find Team 
// @route GET /api/teams/:id
const getTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    res.status(404);
    throw new Error("Team not found");
  } else {
    res.status(200).json(team);
  }
})

export { getTeams, createTeam, updateTeam, addPlayer, getTeam };
