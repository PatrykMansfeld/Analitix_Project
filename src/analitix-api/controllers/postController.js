import { pushSummonerData } from "../playerInfo/summonerInfo.js";
import { pushChampionMastery } from "../championInfo/championInfo.js";
import {
  pushMatchesId,
  pushRankedInfo,
  pushMatchInfo,
} from "../matchInfo/match.js";
import { logger, regionChecker} from "../utils/prop.js";

async function uploadAllMatches(req, res) {
  let region = req.params.region;
  let id = req.params.id;

  if (regionChecker(region)) {
    try {
      let data = await pushMatchesId(region, id);
      let newMatchesCount = await pushMatchInfo(region, await data);
      if (data && !isNaN(newMatchesCount)) {
        logger.info(
          `Uploaded matches info for user with id: ${id} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
        );
        res.status(200).send({
          message: `OK`,
          latestMatchesIds: data,
          numberOfNewMatches: newMatchesCount,
        });
      } else {
        logger.error(
          `Some of data might not be uploaded propertly for user id ${id} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
        );
        res.status(404).send({ message: `Summoner with ID: ${id} not found` });
      }
    } catch (e) {
      logger.error(
        `Some of data might not be uploaded propertly, ${e} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
      );
      res.status(500).send({ message: `Server error`, error: `${e}` });
      console.log(e);
    }
  } else {
    res.status(404).send({ message: `Region not found` });
  }
}

async function uploadChampionMastery(req, res) {
  let region = req.params.region;
  let id = req.params.id;

  if (regionChecker(region)) {
    try {
      let data = await pushChampionMastery(region, id);
      if (data) {
        logger.info(
          `Uploaded champion masteries info for user with id: ${id} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
        );
        res.status(200).send({ message: `OK`, data: data });
      } else {
        logger.warn(
          `User with id ${id} not found... | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
        );
        res.status(404).send({ message: `Summoner with id ${id} not found` });
      }
    } catch (e) {
      logger.warn(
        `Some of data might not be uploaded propertly, ${e} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
      );
      res.status(500).send({ message: `Server error`, error: `${e}` });
      console.log(e);
    }
  } else {
    res.status(404).send({ message: `Region not found` });
  }
}

async function uploadRankedInfo(req, res) {
  let region = req.params.region;
  let id = req.params.id;

  if (regionChecker(region)) {
    try {
      let data = await pushRankedInfo(region, id);
      if (data) {
        logger.info(
          `Uploaded ranked info for user with id: ${id} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
        );
        res.status(200).send({ message: `OK`, data: data });
      } else {
        logger.warn(
          `User with id ${id} not found... | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
        );
        res.status(404).send({ message: `Not found` });
      }
    } catch (e) {
      logger.warn(
        `Some of data might not be uploaded propertly, ${e} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
      );
      res.status(500).send({ message: `Server error`, error: `${e}` });
      console.log(e);
    }
  } else {
    logger.error(
      `Region not found | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
    );
    res.status(404).send({ message: `Not found` });
  }
}

async function uploadAll(req, res) {
  let name = req.params.name;
  name = encodeURI(name);
  let loggingSN = decodeURI(name);
  let region = req.params.region;

  if (regionChecker(region)) {
    try {
      console.log(name);
      let summonerData = await pushSummonerData(name, region);
      if (summonerData) {
        let championMastery = await pushChampionMastery(
          region,
          summonerData.id
        );
        let rankedInfo = await pushRankedInfo(region, summonerData.id);
        let matchesIds = await pushMatchesId(region, summonerData.id);
        let pushMatches = await pushMatchInfo(region, matchesIds);
        if (
          !(
            summonerData &&
            (await championMastery) &&
            (await rankedInfo) &&
            (await matchesIds) &&
            !isNaN(pushMatches)
          )
        ) {
          res.status(500).send({
            message: `Server error`,
            summonerData: summonerData,
            rankedInfo: rankedInfo,
            matchesIds: matchesIds,
            pushMatches: pushMatches,
          });
        } else {
          res.status(200).send({
            message: `OK`,
            summonerData: summonerData,
            rankedInfo: rankedInfo,
          });
          logger.info(
            `Uploaded all data for user ${loggingSN} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
          );
        }
      } else {
        logger.error(
          `Summoner name ${loggingSN} not found | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
        );
        res
          .status(404)
          .send({ message: `Summoner name ${loggingSN} not found` });
      }
    } catch (e) {
      logger.warn(
        `Some of data might not be uploaded propertly for user ${loggingSN}, ${e} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
      );
      res.status(500).send({ message: `Server error`, error: `${e}` });
    }
  } else {
    logger.error(
      `Region not found | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
    );
    res.status(404).send({ message: `Not found` });
  }
}

async function uploadPlayerInfo(req, res) {
  let summonerName = req.params.name;
  summonerName = encodeURI(summonerName);
  var loggingSN = decodeURI(summonerName);
  let region = req.params.region;

  if (regionChecker(region)) {
    try {
      let data = await pushSummonerData(summonerName, region);
      if (data) {
        logger.info(
          `Uploaded summoner info for user ${loggingSN} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
        );
        res.status(200).send(data);
      } else {
        logger.warn(
          `Summoner ${summonerName} not found... | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
        );
        res.status(404).send({ message: "Player not found" });
      }
    } catch (e) {
      logger.warn(
        `Some of data might not be uploaded propertly for user ${loggingSN}, ${e} | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
      );
      res.status(500).send({ message: `Server error`, error: `${e}` });
    }
  } else {
    logger.error(
      `Region not found | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
    );
    res.status(404).send({ message: "Region not found" });
  }
}

export {
  uploadAll,
  uploadAllMatches,
  uploadChampionMastery,
  uploadPlayerInfo,
  uploadRankedInfo,
};
