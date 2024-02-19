import { logger, parser } from "../utils/prop.js";
import getData from "../utils/riotRequest.js";
import { matchesModel, playersModel, rankedInfoModel } from "../utils/dbConfig.js";

async function pushMatchesId(region, id) {
  let matchRegion = parser(region);
  let body = "/lol/match/v5/matches/by-puuid/";
  let matchesIds;
  try {
    const getSummonerId = await playersModel.findById(id);
    const puuid = await getSummonerId.get('puuid');
    if (await getSummonerId === null) {
      throw new Error("Summoner couldn't be found on the database");
    }
    matchesIds = await getData(matchRegion, body, puuid);
    let matchesIdsReversed = matchesIds.reverse();
    const pushToDb = await playersModel.findByIdAndUpdate(id, {$addToSet: {matchesId: {$each: matchesIdsReversed}}}, {upsert: true})
    console.log('Data uploaded', pushToDb);
  } catch (e) {
    console.log(e);
    logger.error(
      `Something went wrong while uploading matches id... [match.js] ${e}`
    );
    return false;
  } finally {
    return await matchesIds;
  }
}

async function pushRankedInfo(region, id) {
  let body = "/lol/league/v4/entries/by-summoner/";
  let data;
  try {
    data = await getData(region, body, id);
    const pushToDb = await rankedInfoModel.findByIdAndUpdate(id, { data }, {upsert: true})
    console.log(pushToDb);
  } catch (e) {
    console.log(e);
    logger.error(
      `Something went wrong while uploading ranked info... [match.js] ${e}`
    );
    return false;
  } finally {
    console.log(await data);
    return await data;
  }
}

async function pushMatchInfo(region, values) {
  let matchRegion = parser(region);
  let countMatches = 0;
  let body = "/lol/match/v5/matches/";
  let nonMatchedIds = [];
  let matches = [];
  try {
    const checkIfExists = await matchesModel.find({_id: {$in: values}});
    const matchedIds = checkIfExists.map((doc) => doc._id); //adding only match ids that were found to this array
    nonMatchedIds = await values.filter((x) => !matchedIds.includes(x)); //filtering id's that don't exist in db
    console.log("non matched: " + nonMatchedIds.length);
    console.log("matched: " + matchedIds.length);
    if (nonMatchedIds.length == 0) {
      return false;
    } else {
      for (let i = 0; i < nonMatchedIds.length; i++) {
        const document = await getData(matchRegion, body, nonMatchedIds[i]);
        document["_id"] = document.metadata.matchId; //moving match id to _id for easier navigation
        matches.push(document);
      }
      const matchesToDb = await matchesModel.insertMany(matches);
      console.log(matchesToDb);
    }
  } catch (e) {
    console.log(e);
    logger.error(
      `Something went wrong after checking if match info already exist in database... [match.js] ${e}`
    );
    return false;
  } finally {
    if (nonMatchedIds.length != 0) {
      logger.info(
        `Inserted ${nonMatchedIds.length} new matches to database! - [match.js]`
      );
      console.log(
        `Inserted ${nonMatchedIds.length} new matches to database! - [match.js]`
      );
    } else {
      logger.info(`Found ${nonMatchedIds.length} new matches! - [match.js]`);
      console.log(`Found ${nonMatchedIds.length} new matches! - [match.js]`);
    }
    return await nonMatchedIds.length;
  }
}
export { pushMatchesId, pushRankedInfo, pushMatchInfo };
