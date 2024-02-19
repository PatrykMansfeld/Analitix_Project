import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import emptySlot from "../../assets/icons/summoner_spells/54.png";

const config = {
  headers: {
    numberOfElements: 10,
  },
};

const summonerSpellsPath = "../../assets/icons/summonerSpells/";

var arrayIndex;

function getGameTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secondsLeft = seconds % 60;
  if (secondsLeft < 10) {
    secondsLeft = `0${secondsLeft}`;
  }
  return `${minutes}:${secondsLeft} min`;
}

function MatchList() {
  // URLS
  const webApiURL = process.env.REACT_APP_API_URL;
  const analitixApiURL = process.env.REACT_APP_ANALITIX_API_URL;
  const dataDragonURL = process.env.REACT_APP_DD_CDN;
  const communityDragonURL = "https://raw.communitydragon.org";

  // GET SESSION DATA
  const playerID = localStorage.getItem("ID");
  const analitixID = localStorage.getItem("AnalitixID");
  const playerName = localStorage.getItem("Name");

  const [showComponent, setShowComponent] = useState(false);
  const handleImageClick = () => {
    setShowComponent(!showComponent);
  };

  const { data, status } = useQuery("matches", async () => {
    try {
      const response = await axios.get(
        `${analitixApiURL}/get/players/matches/${analitixID}/1`,
        config
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="match-list-container">
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error</p>}
      {status === "success" &&
        data
          .slice(0)
          .reverse()
          .map((item) => (
            <>
              <div className="hide-that">
                {/* arrayIndex of function */}
                {
                  (arrayIndex = item.info.participants.findIndex(
                    (element) => element.summonerId === analitixID
                  ))
                }
              </div>

              <div className="match-container">
                {/* basic-info -> Top row with game mode and game result */}
                <div className="match-basic-info">
                  <div className="match-game-mode">{item.info.gameMode}</div>
                  <div className="match-game-result">
                    {item.info.participants[arrayIndex].win === true ? (
                      <p className="game-result-win">Win</p>
                    ) : (
                      <p className="game-result-lost">Lost</p>
                    )}
                  </div>
                  <div className="match-game-time">
                    {getGameTime(item.info.gameDuration)}
                  </div>
                </div>
                {/* summoner-info -> Middle row with champio portrait and stats */}
                <div className="match-summoner-info">
                  {/* Champion portrait */}
                  <div className="match-champion-portrait">
                    <img
                      src={`${communityDragonURL}/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${item.info.participants[arrayIndex].championId}.png`}
                      alt="champion-portrait"
                      className="champion-portrait-img"
                    />
                  </div>
                  <div className="match-stats">
                    {/* KDA, VS, CS */}
                    <div className="kda-section">
                      <div className="stat-section">
                        <p className="stat-header">KDA</p>
                        <p>
                          {item.info.participants[arrayIndex].kills}/
                          {item.info.participants[arrayIndex].deaths}/
                          {item.info.participants[arrayIndex].assists}
                        </p>
                      </div>
                      <div className="stat-section">
                        <p className="stat-header">Ratio</p>
                        <p>
                          {(
                            (item.info.participants[arrayIndex].kills +
                              item.info.participants[arrayIndex].assists) /
                            (item.info.participants[arrayIndex].deaths === 0
                              ? 1
                              : item.info.participants[arrayIndex].deaths)
                          ).toFixed(2)}
                          : 1
                        </p>
                      </div>
                    </div>
                    <div className="others-section">
                      <div className="stat-section">
                        <p className="stat-header">CS:</p>
                        {item.info.participants[arrayIndex].totalMinionsKilled}
                      </div>
                      <div className="stat-section">
                        <p className="stat-header">VS:</p>
                        {item.info.participants[arrayIndex].visionScore}
                      </div>
                    </div>
                    <div className="others-section">
                      <div className="stat-section">
                        <p className="stat-header">DPS/min:</p>
                        {item.info.participants[
                          arrayIndex
                        ].challenges.damagePerMinute.toFixed(0)}
                      </div>
                      <div className="stat-section">
                        <p className="stat-header">Gold/min:</p>
                        {item.info.participants[
                          arrayIndex
                        ].challenges.goldPerMinute.toFixed(0)}
                      </div>
                    </div>
                  </div>
                </div>
                {/* match-summoner-eq -> Bottom row with summoner spells and items */}
                <div className="match-summoner-eq">
                  {/* Summoner spells */}
                  <div className="match-summoner-spells">
                    <img
                      src={require(`../../assets/icons/summoner_spells/${item.info.participants[arrayIndex].summoner1Id}.png`)}
                      alt="summoner-spell-1"
                      className="summoner-spell-img"
                    />
                    <img
                      src={require(`../../assets/icons/summoner_spells/${item.info.participants[arrayIndex].summoner2Id}.png`)}
                      alt="summoner-spell-2"
                      className="summoner-spell-img"
                    />
                  </div>
                  {/* Items */}
                  <div className="match-summoner-items">
                    {item.info.participants[arrayIndex].item0 !== 0 ? (
                      <div className="item">
                        <img
                          src={`${dataDragonURL}/cdn/13.1.1/img/item/${item.info.participants[arrayIndex].item0}.png`}
                          alt="item"
                          className="item-img"
                        />
                      </div>
                    ) : (
                      <div className="item">
                        <img src={emptySlot} alt="item" className="item-img" />
                      </div>
                    )}
                    {item.info.participants[arrayIndex].item1 !== 0 ? (
                      <div className="item">
                        <img
                          src={`${dataDragonURL}/cdn/13.1.1/img/item/${item.info.participants[arrayIndex].item1}.png`}
                          alt="item"
                          className="item-img"
                        />
                      </div>
                    ) : (
                      <div className="item">
                        <img src={emptySlot} alt="item" className="item-img" />
                      </div>
                    )}
                    {item.info.participants[arrayIndex].item2 !== 0 ? (
                      <div className="item">
                        <img
                          src={`${dataDragonURL}/cdn/13.1.1/img/item/${item.info.participants[arrayIndex].item2}.png`}
                          alt="item"
                          className="item-img"
                        />
                      </div>
                    ) : (
                      <div className="item">
                        <img src={emptySlot} alt="item" className="item-img" />
                      </div>
                    )}
                    {item.info.participants[arrayIndex].item3 !== 0 ? (
                      <div className="item">
                        <img
                          src={`${dataDragonURL}/cdn/13.1.1/img/item/${item.info.participants[arrayIndex].item3}.png`}
                          alt="item"
                          className="item-img"
                        />
                      </div>
                    ) : (
                      <div className="item">
                        <img src={emptySlot} alt="item" className="item-img" />
                      </div>
                    )}
                    {item.info.participants[arrayIndex].item4 !== 0 ? (
                      <div className="item">
                        <img
                          src={`${dataDragonURL}/cdn/13.1.1/img/item/${item.info.participants[arrayIndex].item4}.png`}
                          alt="item"
                          className="item-img"
                        />
                      </div>
                    ) : (
                      <div className="item">
                        <img src={emptySlot} alt="item" className="item-img" />
                      </div>
                    )}
                    {item.info.participants[arrayIndex].item5 !== 0 ? (
                      <div className="item">
                        <img
                          src={`${dataDragonURL}/cdn/13.1.1/img/item/${item.info.participants[arrayIndex].item5}.png`}
                          alt="item"
                          className="item-img"
                        />
                      </div>
                    ) : (
                      <div className="item">
                        <img src={emptySlot} alt="item" className="item-img" />
                      </div>
                    )}
                    {item.info.participants[arrayIndex].item6 !== 0 ? (
                      <div className="item">
                        <img
                          src={`${dataDragonURL}/cdn/13.1.1/img/item/${item.info.participants[arrayIndex].item6}.png`}
                          alt="item"
                          className="item-img"
                        />
                      </div>
                    ) : (
                      <div className="item">
                        <img src={emptySlot} alt="item" className="item-img" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ))}
    </div>
  );
}

export default MatchList;
