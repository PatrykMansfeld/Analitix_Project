import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import AddPlayerBtn from "./AddPlayerBtn";

function CoachPanel() {
  const webApiURL = process.env.REACT_APP_API_URL;
  const analitixApiURL = process.env.REACT_APP_ANALITIX_API_URL;
  const communityDragonURL = "https://raw.communitydragon.org";
  // console.log(`webApiURL: ${webApiURL}`);

  const teamID = localStorage.getItem("AnalitixID");
  const coachName = localStorage.getItem("Name");

  const { data } = useQuery("users", async () => {
    const response = await axios.get(`${webApiURL}/api/teams/${teamID}`);
    return response.data;
  });

  // console.log(data.players);

  async function getPlayerData(playerID) {
    const response = await axios.get(
      `${analitixApiURL}/get/players/${playerID}`
    );
    return response.data;
  }

  async function getPlayerRankedData(playerID) {
    const response = await axios.get(
      `${analitixApiURL}/get/players/rankeds/${playerID}`
    );
    return response.data;
  }

  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Get specific team data
      try {
        const teamData = await axios.get(`${webApiURL}/api/teams/${teamID}`);
        // When found assign to teamPlayersArray each player ID
        const teamPlayersArray = teamData.data.players;
        const teamPlayersDataArray = [];
        // For each player in teamPlayersArray, get player data
        for (const playerID of teamPlayersArray) {
          try {
            const playerData = await getPlayerData(playerID);
            const playerRankedData = await getPlayerRankedData(playerID);
            const mergedPlayerData = { ...playerData, ...playerRankedData };
            // Push player data to teamPlayersDataArray

            teamPlayersDataArray.push(mergedPlayerData);

            // console.log(teamPlayersDataArray);
            // console.log(teamPlayersDataArray);
          } catch (error) {
            console.log(error);
          }
        }
        // Update dataArray with teamPlayersDataArray
        setDataArray(teamPlayersDataArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="coach-panel-container">
        {dataArray.length >= 1 && (
          <div className="coach-panel-background">
            <img
              className="coach-panel-background-img"
              src={`${communityDragonURL}/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${dataArray[0]?.profileIconId}.jpg`}
              alt="summoner-icon"
            ></img>
          </div>
        )}
        <div className="coach-panel">
          <h1 className="coach-panel-heading">
            Welcome, <span className="coach-panel-name">{coachName}</span>!
          </h1>
          <p>
            Let's see how <span className="coach-panel-team">{data?.name}</span>{" "}
            team is doing!
          </p>
        </div>

        <div className="team-panel">
          {dataArray.length < 5 && <AddPlayerBtn />}

          <div className="coach-panel-players">
            {dataArray.map((item) => (
              <>
                <div className="player-info-panel">
                  <div className="player-info">
                    <p className="player-info-heading">Player info</p>
                    <div className="player-info-details">
                      <p className="player-name">{item?.name}</p>
                      <p>Lvl. {item?.summonerLevel}</p>
                    </div>
                  </div>
                  <div className="player-info-icon">
                    <img
                      className="player-icon"
                      src={`${communityDragonURL}/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${item?.profileIconId}.jpg`}
                      alt="summoner-icon"
                    ></img>
                  </div>
                  <div className="player-info-rankeds">
                    <p className="player-info-heading">Ranked info</p>
                    <div className="player-info-details">
                      {item?.data?.length > 0 ? (
                        <>
                          <p className="tier">
                            {item?.data[0]?.tier} {item?.data[0]?.rank}
                          </p>
                          <p className="lp">{item?.data[0]?.leaguePoints} LP</p>
                        </>
                      ) : (
                        <p className="unranked">Unranked</p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CoachPanel;
