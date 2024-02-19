import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import MatchList from "./MatchList";

function UserPanel() {
  // URLS
  const webApiURL = process.env.REACT_APP_API_URL;
  const analitixApiURL = process.env.REACT_APP_ANALITIX_API_URL;
  const communityDragonURL = "https://raw.communitydragon.org";

  // GET SESSION DATA
  const playerID = localStorage.getItem("ID");
  const analitixID = localStorage.getItem("AnalitixID");
  const playerName = localStorage.getItem("Name");

  // UPLOAD DATA REQUEST
  const postData = axios.post(
    `${analitixApiURL}/upload/all/${playerName}/eun1`
  );
  window.addEventListener("load", postData);

  const { data } = useQuery("users", async () => {
    try {
      const response = await axios.get(
        `${analitixApiURL}/get/players/${analitixID}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="user-panel-container">
      <div className="user-panel-background">
        <img
          className="user-panel-background-img"
          src={`${communityDragonURL}/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${data?.profileIconId}.jpg`}
          alt="summoner-icon"
        ></img>
      </div>
      <div className="user-panel">
        <img
          className="user-icon"
          src={`${communityDragonURL}/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${data?.profileIconId}.jpg`}
          alt="summoner-icon"
        ></img>
        <h1 className="user-name">{data?.name}</h1>
        <h1 className="user-level">Lvl. {data?.summonerLevel}</h1>
      </div>

      <div className="user-panel-matches">
        <MatchList />
      </div>
    </div>
  );
}

export default UserPanel;
