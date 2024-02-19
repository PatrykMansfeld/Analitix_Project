import dotenv from "dotenv/config";

async function uploadPlayer(summonerName, summonerRegion) {
  let analitixApiURI = process.env.ANALITIX_API_URI;
  const playerRequest = await fetch(
    `${analitixApiURI}/upload/player/${summonerName}/${summonerRegion}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (playerRequest.status === 404) {
    return false;
  }

  const playerData = await playerRequest.json();
  // RETURN PLAYER BODY
  console.log(playerData);

  return playerData;
}

export { uploadPlayer };
