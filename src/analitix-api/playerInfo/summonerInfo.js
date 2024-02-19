import { logger } from "../utils/prop.js";
import getData from "../utils/riotRequest.js";
import { playersModel } from "../utils/dbConfig.js";

async function pushSummonerData(summonerName, region) {
  let summonerId;
  const body = "/lol/summoner/v4/summoners/by-name/";
  let riotData;
  try {
    riotData = await getData(region, body, summonerName);
    summonerId = riotData.id;
    console.log(riotData);
    const pushToDb = await playersModel.findOneAndUpdate({_id: summonerId}, {$set: riotData}, { upsert: true, new: true });
    console.log('Document uploaded', pushToDb);
    logger.info(`Summoner data uploaded, ${pushToDb}`)
  } catch (e) {
    console.log(e);
    logger.error(
      `Something went wrong while uploading user data... [summonerInfo.js] ${e}`
    );
    return false;
  } finally {
    return await riotData;
  }
}

export { pushSummonerData };
