import { logger } from "../utils/prop.js";
import getData from "../utils/riotRequest.js";
import { championMasteriesModel } from "../utils/dbConfig.js";

async function pushChampionMastery(region, id) {
  let body = "/lol/champion-mastery/v4/champion-masteries/by-summoner/";
  let riotData;
  try {
    riotData = await getData(region, body, id);
    const uploadCM = await championMasteriesModel.findByIdAndUpdate({_id: id}, { riotData }, { upsert: true, new: true });
    console.log('Document uploaded', uploadCM);
  } catch (e) {
    console.log(e);
    logger.info(
      `Something went wrong with uploading data to database... [championInfo.js/upload_championMastery()] ${e}`
    );
    return false;
  } finally {
    return await riotData;
  }
}

export { pushChampionMastery };
