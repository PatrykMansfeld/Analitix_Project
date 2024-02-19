import fetch from "node-fetch";
import { logger } from "./prop.js";
import * as dotenv from "dotenv";

dotenv.config();
const apiKey = process.env.RIOT_API_KEY;

async function getData(region, body, keyValue) {
  const headers = {
    "Accept-Language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    Origin: "https://developer.riotgames.com",
    "X-Riot-Token": apiKey,
  };
  let tail = "";
  let puuidCheck = body.split("/");
  if (puuidCheck[5] == "by-puuid") {
    tail = "/ids";
  }
  const response = await fetch(
    `https://${region}.api.riotgames.com${body}${keyValue}${tail}`,
    { method: "GET", headers: headers }
  );
  if (!response.ok) {
    logger.error(
      `Something went wrong while executing Riot request... ${response.status} : ${response.statusText}`
    );
    throw new Error(response.statusText);
  }
  let data = await response.json();
  return await data;
}
export default getData;
