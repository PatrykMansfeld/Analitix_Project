// IMPORTS
import express from "express";
import dotenv from "dotenv/config";
import colors from "colors";
import cors from "cors";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { connectDb } from "./database/dbConfig.js";

// ROUTES IMPORTS
import { userRouter } from "./routes/userRoutes.js";
import { teamRouter } from "./routes/teamRoutes.js";

// APP CONFIG
const app = express();
let appStream = process.env.STREAM;
let PORT;
appStream === "dev"
  ? (PORT = process.env.DEV_PORT)
  : (PORT = process.env.PRD_PORT);

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// DATABASE
connectDb();

// ROUTES
app.use("/api/users/", userRouter);
app.use("/api/teams/", teamRouter);

// CUSTOM MIDDLEWARE
app.use(errorHandler);

// SERVER
app.listen(PORT, () => {
  console.log(
    `Server is running on ${appStream} and listening on port ${PORT}`
  );
});
