import React, { useState, useEffect } from "react";
import {
  Container,
  BarContainer,
  TeamBar,
  TeamInfoContainer,
  GameInfoBar,
  PicksContainer,
  FlexContainer,
  BlueContainer,
  RedContainer,
  BansContainer,
  SelectionContainer,
  Options,
  UnorderedList,
  ListItem,
  ChampionsContainer,
  Champion,
  ChampionSplash,
  ButtonRow,
  Button,
  Input,
} from "./Admin.elements";

import PickComponent from "./components/PickComponent";
import BanComponent from "./components/BanComponent";

//var order = ['blue', 'red', 'red', 'blue', 'blue', 'red', 'blue', 'red', 'red', 'blue', 'blue', 'red', 'red', 'blue', 'blue', 'red', 'red', 'blue', 'blue', 'red']
var order = ['blue', 'red', 'blue', 'red', 'blue', 'red', 'red', 'blue', 'blue', 'red', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'blue', 'red']

const Admin = ({ socket }) => {
  const [status, setStatus] = useState("idle");
  const [champions, setChampions] = useState([]);
  const [filter, setFilter] = useState("");

  const [barInfo, setBarInfo] = useState({
    blueTeamInitials: "",
    blueTeamName: "",
    blueTeamScore: "",
    redTeamInitials: "",
    redTeamName: "",
    redTeamScore: "",
    phaseRound: "",
    phaseGame: "",
  });

  const [playerIGNs, setPlayerIGNs] = useState([
    { id: 1, ign: "" },
    { id: 2, ign: "" },
    { id: 3, ign: "" },
    { id: 4, ign: "" },
    { id: 5, ign: "" },
    { id: 6, ign: "" },
    { id: 7, ign: "" },
    { id: 8, ign: "" },
    { id: 9, ign: "" },
    { id: 10, ign: "" },
  ]);

  const [currentPicks, setCurrentPicks] = useState({
    blue: [
      {id: 4, champion: ""},
      {id: 7, champion: ""},
      {id: 8, champion: ""},
      {id: 15, champion: ""},
      {id: 16, champion: ""},
    ],
    red: [
      {id: 5, champion: ""},
      {id: 6, champion: ""},
      {id: 9, champion: ""},
      {id: 14, champion: ""},
      {id: 17, champion: ""},
    ],
  });
  
  const [currentBans, setCurrentBans] = useState({
    blue: [
      {id: 0, champion: ""},
      {id: 2, champion: ""},
      {id: 11, champion: ""},
      {id: 13, champion: ""},
      //{id: 14, champion: ""},
    ],
    red: [
      {id: 1, champion: ""},
      {id: 3, champion: ""},
      {id: 10, champion: ""},
      {id: 12, champion: ""},
      //{id: 15, champion: ""},
    ]
  });

  const [currentSlot, setCurrentSlot] = useState(0);
  const [selectedChampion, setSelectedChampion] = useState("");
  const [startTimer, setStartTimer] = useState(false);

  // Fetch champion list
  useEffect(() => {
    const fetchData = async () => {
      setStatus("fetching");
      const response = await require("../../champions.json");
      const data = await response.champions;
      setChampions(data);
      setStatus("fetched");
    };
    fetchData();
  }, []);

  // Send bar infos: Round & Game #
  useEffect(() => {
    socket.emit("sendBarInfo", barInfo);
  }, [barInfo]);

  // Send current slot
  useEffect(() => {
    socket.emit("sendCurrentSlot", currentSlot);
  }, [currentSlot]);

  // Send current selected champion
  useEffect(() => {
    socket.emit(
      "sendSelectedChampion",
      selectedChampion,
      currentSlot
    );
  }, [selectedChampion]);
  
  // Send player IGNs
  useEffect(() => {
    socket.emit("sendPlayerIGNs", playerIGNs);
  }, [playerIGNs]);

  const handleStartTimer = () => {
    setStartTimer(true);
    socket.emit("sendStartTimer");
  };

  const handlePlayerIGNs = (e, idx) => {
    setPlayerIGNs((previousIGNs) => {
      const newIGNs = Array.from(previousIGNs);
      newIGNs[idx].ign = e.target.value;
      console.log(newIGNs);
      return newIGNs;
    });
  };

  const removeChampion = (champion) => {
    let newChampions = Array.from(champions);
    newChampions = newChampions.filter(function (item) {
      return item.name !== champion;
    });
    setChampions(newChampions);
  };

  const handleLockIn = () => {
    if (currentSlot <= 19) {
      if (selectedChampion === "") {
        alert("Pick a champion first.");
      } else {
        setCurrentSlot(currentSlot + 1);
        removeChampion(selectedChampion);
      }
      setSelectedChampion("");
    } else {
      alert("Pick & Ban has concluded.");
    }
  };

  const handleSelectChampion = (e) => {
    if ((currentSlot >= 0 && currentSlot <= 3) || (currentSlot >= 10 && currentSlot <= 13)) {
      setSelectedChampion(e.currentTarget.id);
      let newBans = Object.assign({}, currentBans);
      let idx = newBans[order[currentSlot]].findIndex(x => x.id === currentSlot);
      newBans[order[currentSlot]][idx].champion = e.currentTarget.id;
      setCurrentBans(newBans);
    }

    else if ((currentSlot >= 4 && currentSlot <= 9) || (currentSlot >= 14 && currentSlot <= 17)) {
      setSelectedChampion(e.currentTarget.id);
      let newPicks = Object.assign({}, currentPicks);
      let idx = newPicks[order[currentSlot]].findIndex(x => x.id === currentSlot);
      newPicks[order[currentSlot]][idx].champion = e.currentTarget.id;
      setCurrentPicks(newPicks);
    }

    else {
      alert("Pick & Ban has concluded.");
    }
  };

  const swapChampions = (fromItem, toItem, team) => {
    let newPicks = Object.assign({}, currentPicks);
    let fromIdx = currentPicks[team].findIndex(x => x.id === parseInt(fromItem.id));
    let toIdx = currentPicks[team].findIndex(x => x.id === parseInt(toItem.id));

    [newPicks[team][fromIdx].champion, newPicks[team][toIdx].champion] = [newPicks[team][toIdx].champion, newPicks[team][fromIdx].champion]
    console.log(newPicks);
    setCurrentPicks(newPicks);

    socket.emit("sendUpdatedPicks", newPicks);
  };

  const handleDragStart = data => event => {
    let fromItem = JSON.stringify({ id: event.currentTarget.slot });
    event.dataTransfer.setData("dragContent", fromItem);
  };

  const handleDragOver = data => event => {
    event.preventDefault();
    return false;
  };

  const  handleDrop = (data, team) => event => {
    event.preventDefault();

    let fromItem = JSON.parse(event.dataTransfer.getData("dragContent"));
    let toItem = { id: event.currentTarget.slot };

    swapChampions(fromItem, toItem, team);
    return false;
  };

  const injectChampions = (championArray) => {
    championArray = championArray.filter(
      (item) =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.role.toLowerCase().includes(filter.toLowerCase()) ||
        filter === ""
    );
    let champions = [];
    for (let i = 0; i < championArray.length; i++) {
      var urlBG = require(`../../images/cache/11.21.1/champion/${championArray[
        i
      ].name.replace(/[^A-Z0-9]/gi, "")}_square.png`).default;
      champions.push(
        <Champion
          id={`${championArray[i].name}`}
          key={`${championArray[i].name}`}
          onClick={(e) => handleSelectChampion(e)}
        >
          <ChampionSplash
            id={`champ_splash_${i}`}
            style={{backgroundImage: `url(${urlBG})`}}
          />
        </Champion>
      );
    }
    return champions;
  };

  return (
    <>
      {status === "fetched" && (
        <Container>
          <BarContainer>
            <TeamBar team="blue">
              <TeamInfoContainer>
                <Input
                  id="blue_initials_input"
                  placeholder="Blue Team's Initials"
                  onBlur={(e) => {
                    setBarInfo({ ...barInfo, blueTeamInitials: e.target.value });
                  }}
                />
                <Input
                  id="blue_name_input"
                  placeholder="Blue Team's Name"
                  onBlur={(e) => {
                    setBarInfo({ ...barInfo, blueTeamName: e.target.value });
                  }}
                />
              </TeamInfoContainer>
                <Input
                  type="number"
                  id="blue_score_input"
                  placeholder="Score"
                  onBlur={(e) => {
                    setBarInfo({ ...barInfo, blueTeamScore: e.target.value });
                  }}
                />
            </TeamBar>

            <GameInfoBar>
              <Input
                id="phase_round_input"
                placeholder="(Ex. Semi-Finals, Finals)"
                onBlur={(e) => {
                  setBarInfo({ ...barInfo, phaseRound: e.target.value });
                }}
              />
              <Input
                id="phase_game_input"
                placeholder="(Ex. Game 1/2/3)"
                onBlur={(e) => {
                  setBarInfo({ ...barInfo, phaseGame: e.target.value });
                }}
              />
            </GameInfoBar>

            <TeamBar team="red">
              <Input
                type="number"
                id="red_score_input"
                placeholder="Score"
                onBlur={(e) => {
                  setBarInfo({ ...barInfo, redTeamScore: e.target.value });
                }}
              />
              <TeamInfoContainer>
                <Input
                  id="red_initials_input"
                  placeholder="Red Team's Initials"
                  onBlur={(e) => {
                    setBarInfo({ ...barInfo, redTeamInitials: e.target.value });
                  }}
                />
                <Input
                  id="red_name_input"
                  placeholder="Red Team's Name"
                  onBlur={(e) => {
                    setBarInfo({ ...barInfo, redTeamName: e.target.value });
                  }}
                />
              </TeamInfoContainer>
            </TeamBar>
          </BarContainer>

          <FlexContainer>
            <BlueContainer>
              <PicksContainer team="blue">
                {currentPicks.blue.map((pick, idx) => {
                  return (
                    <PickComponent team={"blue"} idx={idx} slot={pick.id} key={pick.id} champion={pick.champion} handlePlayerIGNs={handlePlayerIGNs} currentSlot={currentSlot} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop}/>
                  )
                })}
              </PicksContainer>
              <BansContainer team="blue">
                {currentBans.blue.map((ban, idx) => {
                  return (
                    <BanComponent team={"blue"} idx={idx} slot={ban.id} key={ban.id} champion={ban.champion} currentSlot={currentSlot}/>
                  )
                })}
              </BansContainer>
            </BlueContainer>
 
            <SelectionContainer>
              <Options>
                <UnorderedList>
                  <ListItem onClick={() => setFilter(filter === "assassin" ? "" : "assassin")}>Assassin</ListItem>
                  <ListItem onClick={() => setFilter(filter === "fighter" ? "" : "fighter")}>Fighter</ListItem>
                  <ListItem onClick={() => setFilter(filter === "mage" ? "" : "mage")}>Mage</ListItem>
                  <ListItem onClick={() => setFilter(filter === "marksman" ? "" : "marksman")}>Marksman</ListItem>
                  <ListItem onClick={() => setFilter(filter === "support" ? "" : "support")}>Support</ListItem>
                  <ListItem onClick={() => setFilter(filter === "tank" ? "" : "tank")}>Tank</ListItem>
                  <ListItem>
                    <Input
                      id="filter"
                      name="filter"
                      type="text"
                      value={filter}
                      onChange={(event) => setFilter(event.target.value)}
                    />
                  </ListItem>
                </UnorderedList>
              </Options>

              <ChampionsContainer>{injectChampions(champions)}</ChampionsContainer>              
              <ButtonRow>
                <Button onClick={handleLockIn}>LOCK IN</Button>
                <Button onClick={handleStartTimer} disabled={startTimer}>START GAME</Button>
              </ButtonRow>
            </SelectionContainer>

            <RedContainer>
              <PicksContainer team="red">
                {currentPicks.red.map((pick, idx) => {
                  return (
                    <PickComponent team={"red"} idx={idx} slot={pick.id} key={pick.id} champion={pick.champion} handlePlayerIGNs={handlePlayerIGNs} currentSlot={currentSlot} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop}/>
                  )
                })}
              </PicksContainer>
              <BansContainer team="red">
                {currentBans.red.map((ban, idx) => {
                  return (
                    <BanComponent team={"red"} idx={idx} slot={ban.id} key={ban.id} champion={ban.champion} currentSlot={currentSlot}/>
                  )
                })}
              </BansContainer>
            </RedContainer>
          </FlexContainer>
        </Container>
      )}
    </>
  );
};

export default Admin;
