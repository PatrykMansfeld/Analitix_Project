import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
import winston from "winston";
import { MongoDB } from "winston-mongodb"; //required for uploading logs to mongodb, even if it seems not to be used
dotenv.config();

const url = process.env.MONGO_URL;
const client = new MongoClient(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
  keepAlive: true,
});

// keepAlive - Preventing disconnection due to network inactivity, Checking for dead peers

const logConfiguration = {
  transports: [
    new winston.transports.MongoDB({
      db: url,
      dbName: "analitix-api",
      collection: "Logs",
      options: { useUnifiedTopology: true },
      includeIds: false,
    }),
    //use for local log saving
    // new winston.transports.File({
    //     filename:'./logs/api.log'
    // })
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    winston.format.align(),
    winston.format.printf(
      (info) => `${info.timestamp} [${info.level}]: ${info.message}`
    ),
    winston.format.json()
  ),
};

const logger = winston.createLogger(logConfiguration);

//From official RIOT API documentation:
//The AMERICAS routing value serves NA, BR, LAN and LAS.
//Las == la2
//lan == la1
//The ASIA routing value serves KR and JP.
//The EUROPE routing value serves EUNE, EUW, TR, and RU.
//The SEA routing value serves OCE.
//Parser is used for /lol/match/v5/matches/{matchId} API Request
function parser(region) {
  region = region.toLowerCase();
  switch (region) {
    case "eun1":
      return "europe";
    case "euw1":
      return "europe";
    case "br1":
      return "americas";
    case "jp1":
      return "asia";
    case "kr":
      return "asia";
    case "la1":
      return "americas";
    case "la2":
      return "americas";
    case "na1":
      return "americas";
    case "oc1":
      return "sea";
    case "tr1":
      return "europe";
    case "ru":
      return "europe";
  }
}

function regionChecker(region) {
  region = region.toLowerCase();
  switch (region) {
    case "eun1":
      return true;
    case "euw1":
      return true;
    case "br1":
      return true;
    case "jp1":
      return true;
    case "kr":
      return true;
    case "la1":
      return true;
    case "la2":
      return true;
    case "na1":
      return true;
    case "oc1":
      return true;
    case "tr1":
      return true;
    case "ru":
      return true;
    default:
      logger.error(`Region ${region} is unrecognized`);
      return false;
  }
}

export { client, parser, logger, regionChecker };
