import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { logger } from "./prop.js";
dotenv.config();

const url = process.env.MONGO_URL;
async function dbConnect() {
  try {
    const db = await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(
        `Successfully connected to MongoDB: ${db.connection.host}`
      );
  } catch (e) {
    console.log(e);
    logger.error(`MONGODB ERROR: ${e}`);
  }
}

const schema = new mongoose.Schema({
    _id: {type: String}
},
{
  strict: false
});

mongoose.set('strictQuery', false);
const championMasteriesModel = mongoose.model("championMasteriesModel", schema, "ChampionMasteries");
const matchesModel = mongoose.model("matchesModel", schema, "Matches");
const playersModel = mongoose.model("playersModel", schema, "Players");
const rankedInfoModel = mongoose.model("rankedInfoModel", schema, "RankedInfo");

export {
  championMasteriesModel,
  matchesModel,
  playersModel,
  rankedInfoModel,
  dbConnect
};
