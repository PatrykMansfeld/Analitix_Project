import { User } from "../models/user.model.js";
import { Team } from "../models/team.model.js";
import { uploadPlayer } from "../utils/fetcher.js";
import { updatePlayer } from "../utils/updater.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Private
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, accountType, region, teamName } = req.body;

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Player registration
  if (accountType === "player") {
    // Check if user already exists

    const playerData = await uploadPlayer(name, region);
    // Upload all player data to analitix-api

    if (playerData) {
      const analitixId = playerData.id;

      const updatedPlayer = await updatePlayer(name, region);

      const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        region: region,
        accountType: accountType,
        analitixId: analitixId,
      }).catch(() => {
        res.status(400);
        throw new Error(`Email or username already exists`);
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        region: user.region,
        accountType: user.accountType,
        analitixId: user.analitixId,
      });
    } else {
      res.status(404);
      throw new Error(`Summoner ${name} not found`);
    }

    // Coach registration
  } else if (accountType === "coach") {
    const teamExists = await Team.findOne({ name: teamName });
    if (teamExists) {
      res.status(400);
      throw new Error("Team already exists");
    } else {
      const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        accountType: accountType,
      });

      const team = await Team.create({
        _id: user._id,
        name: teamName,
      }).catch((err) => {
        res.status(400);
        throw new Error("Could not create team");
      });

      user.teamId = team._id;
      await user.save().catch((err) => {
        res.status(400);
        throw new Error("Could not save user");
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        accountType: user.accountType,
        teamId: user.teamId,
      });
    }
    // Wrong account type
  } else if (
    req.body.accountType !== "coach" ||
    req.body.accountType !== "player"
  ) {
    res.status(400);
    throw new Error("Wrong account type");

    // Server error
  } else {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      accountType: user.accountType,
      analitixId: user.analitixId,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export { getUsers, registerUser, loginUser };
