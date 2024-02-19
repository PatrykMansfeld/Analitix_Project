import express from "express";
import cors from "cors";
import { logger } from "./utils/prop.js";
import routerGet from "./routes/routerGet.js";
import routerPost from "./routes/routerPost.js";
import { dbConnect } from "./utils/dbConfig.js";

dbConnect();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/get", routerGet);
app.use("/upload", routerPost);

app.get("/test", (req, res) => {
  res.status(200).send({ message: "Hello World!" });
  logger.info(
    `Test request | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
  );
});

export default app;
