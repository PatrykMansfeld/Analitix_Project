import { logger } from "../utils/prop.js";
import {championMasteriesModel, matchesModel, playersModel, rankedInfoModel } from "../utils/dbConfig.js";
// getting ranked info
async function getRankedInfo(req, res) {
  let id = req.params.id;

  let findRankedInfo;
  try {
    findRankedInfo = await rankedInfoModel.findById(id);
    console.log(findRankedInfo);
    if (findRankedInfo !== null) {
      res.status(200).send(findRankedInfo);
    } else {
      res
        .status(404)
        .send({ message: `Couldn't find ranked info for player id: ${id}` });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: `Couldn't execute query for rankedInfo, ${e}` });
    logger.error(
      `Couldn't execute query for getting ranked info... ${e} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
    );
  } finally {
    logger.info(
      `Executed getRankedInfo request for summoner id: ${id} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
    );
  }
}

// getting summoner info
async function getSummonerInfo(req, res) {
  let id = req.params.id;

  let findSummonerInfo;
  try {
    findSummonerInfo = await playersModel.findById(id);
    if (findSummonerInfo != null) {
      res.status(200).send(findSummonerInfo);
    } else {
      res.status(404).send({ message: `Player with id: ${id} not found.` });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: `Couldn't execute query for summonerInfo, ${e}` });
    logger.error(
      `Couldn't execute query for getting summoner info... ${e} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
    );
  } finally {
    logger.info(
      `Executed getSummonerInfo request for summoner id: ${id} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
    );
  }
}

// getting champion mastery info by player id
async function getChampionMasteryInfo(req, res) {
  let id = req.params.id;
  var findMasteryInfo;
  try {
    findMasteryInfo = await championMasteriesModel.findById(id);
    if (findMasteryInfo !== null) {
      res.status(200).send(findMasteryInfo);
    } else {
      res.status(404).send({
        message: `Couldn't find player champion mastery with player id: ${id}`,
      });
    }
  } catch (e) {
    res.status(500).send({
      message: `Couldn't execute query for championMasteryInfo, ${e}`,
    });
    logger.error(
      `Couldn't execute query for getting champion mastery info... ${e} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
    );
  } finally {
    logger.info(
      `Executed getChampionMasteryInfo request for summoner id: ${id} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
    );
  }
}

// getting match info by match id
async function getMatchInfo(req, res) {
  let id = req.params.id;

  let findMatchInfo;
  try {
    findMatchInfo = await matchesModel.findById(id);
    if (findMatchInfo !== null) {
      res.status(200).send(findMatchInfo);
    } else {
      res
        .status(404)
        .send({ message: `Couldn't find match info with match id: ${id}` });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: `Couldn't execute query for matchInfo, ${e}` });
    logger.error(
      `Couldn't execute query for getting match info... ${e} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
    );
  } finally {
    logger.info(
      `Executed getMatchInfo request for match id: ${id} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
    );
  }
}

// getting all matches by user id
async function getMatchesInfo(req, res) {
  let userId = req.params.id;
  let number = req.params.number; //ex: nr 1 -> matches from 0 to 9, nr 2 -> matches from 10 to 19

  try {
    number = parseInt(number);
  } catch (e) {
    res
      .status(400)
      .send({ message: "Value after player id is not an integer", error: e });
  }
  if (number < 1 || !Number.isInteger(number)) {
    res.status(400).send({ message: "Value after player id is less than 1" });
  } else {
    let findPlayerInfo;
    try {
      findPlayerInfo = await playersModel.findById(userId);
      let max = 10 * number;
      var min = 10 * (number - 1);
      if (findPlayerInfo == null) {
        logger.error(
          `Couldn't find player with id: ${userId} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
        );
        res
          .status(404)
          .send({ message: `Couldn't find player with id: ${userId}` });
      } else {
        let arrayLen = await findPlayerInfo.get('matchesId').length;
        const matchIds = findPlayerInfo.get('matchesId').reverse().slice(min, max); //array with matches id's

        if (arrayLen > 0) {
          // const findMatchByIds = await database
          //   .collection("Matches")
          //   .find({ _id: { $in: matchIds } })
          //   .toArray();
          const findMatchByIds = await matchesModel.find({_id: {$in: matchIds}})
          res.status(200).send(findMatchByIds);
        } else {
          res
            .status(400)
            .send({ message: "Number exceeded array of player's matchIds" });
        }
      }
    } catch (e) {
      res
        .status(500)
        .send({ message: `Couldn't execute query for matchesInfo, ${e}` });
      logger.error(
        `Couldn't execute query for getting matches info... ${e} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
      );
    } finally {
      logger.info(
        `Executed getMatchInfo request for user with id: ${userId} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
      );
    }
  }
}

export {
  getChampionMasteryInfo,
  getMatchInfo,
  getMatchesInfo,
  getRankedInfo,
  getSummonerInfo,
};
