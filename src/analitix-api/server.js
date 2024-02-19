import express from "express";
import { logger } from "./utils/prop.js";
import routerGet from "./routes/routerGet.js";
import routerPost from "./routes/routerPost.js";
import cors from "cors";
import { dbConnect } from "./utils/dbConfig.js";

dbConnect();

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/get", routerGet);
app.use("/upload", routerPost);

app.listen(port, () => {
  console.log(`Analitix API listening on port ${port}`);
  logger.info(`Analitix API listening on port ${port}`);
});

app.use(function (req, res, next) {
  logger.error(
    `400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
  res.status(404).send({ message: "404: Request not found" });
});

app.use((err, req, res, next) => {
  logger.error(
    `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}`
  );
  res.status(500).send({ message: "Could not perform the action" });
});
