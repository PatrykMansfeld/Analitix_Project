import dotenv from "dotenv/config";

async function updatePlayer(summonerName, summonerRegion) {
  let analitixApiURI = process.env.ANALITIX_API_URI;
  const uploadPlayerRequest = await fetch(
    `${analitixApiURI}/upload/all/${summonerName}/${summonerRegion}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (uploadPlayerRequest.status === 404) {
    return false;
  }

  const playerData = await uploadPlayerRequest.json();
  // RETURN PLAYER BODY
  console.log(playerData);

  return playerData;
}

export { updatePlayer };
