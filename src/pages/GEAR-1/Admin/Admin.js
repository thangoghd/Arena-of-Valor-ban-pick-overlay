import React, { useState, useEffect } from "react";
import {
  Container,
  BarContainer,
  Blue,
  Red,
  TeamInfoContainer,
  PhaseInfo,
  PicksContainer,
  Pick,
  FlexContainer,
  BlueContainer,
  RedContainer,
  ChampionPickSplash,
  ChampionName,
  PlayerName,
  BansContainer,
  Ban,
  ChampionBanSplash,
  SelectionContainer,
  Options,
  UnorderedList,
  ListItem,
  ChampionsContainer,
  Champion,
  ChampionSplash,
  ButtonRow,
  Button,
} from "./Admin.elements";

var roles = ["top", "jungle", "middle", "bottom", "utility"];

const PickComponent = React.memo(({ champion, handlePlayerIGNs, currentSlot, team, idx, slot, onDragStart, onDragOver, onDrop }) => {
  var urlBG = champion === "" ? require(`../../images/role-${roles[idx]}.png`).default : require(`../../images/cache/11.21.1/champion/${champion.replace(/[^A-Z0-9]/ig, "")}_centered_splash.jpg`).default;
  var pickID = `"pick_${team}_${idx}"`;
  return (
    <Pick id={pickID} key={slot} slot={slot} draggable="true" onDragStart={onDragStart(pickID)} onDragOver={onDragOver(pickID)} onDrop={onDrop(pickID)}>
      <ChampionPickSplash
        blank={champion === "" ? true : false}
        active={slot === currentSlot ? true : false}
        style={{ backgroundImage: `url(${urlBG})` }}
        id={`"pick_${team}_splash_${idx}"`}
      />
      <ChampionName id={`"pick_${team}_champ_${idx}"`}>{champion}</ChampionName>
      <input id={`"pick_${team}_ign_${idx}"`} placeholder={`Player ${team === "blue" ? idx : idx+5}'s IGN`} onBlur={(e) => handlePlayerIGNs(e, team === "blue" ? idx : idx+5)}></input>
    </Pick>
  );
});

const BanComponent = React.memo(({ champion, currentSlot, team, idx, slot }) => {
  var urlBG = champion === "" ? require(`../../images/ban-placeholder.png`).default : require(`../../images/cache/11.21.1/champion/${champion.replace(/[^A-Z0-9]/ig, "")}_centered_splash.jpg`).default;
  return (
    <Ban id={`ban_${team}_${idx}`} key={slot}>
      <ChampionBanSplash
        blank={champion === "" ? true : false}
        active={slot === currentSlot ? true : false}
        style={{ backgroundImage: `url(${urlBG})` }}
        id={`bans_${team}_splash_${idx}`}
      >
        {/*champion !== "" && slot !== currentSlot && (<BanSymbol src={require(`../../images/ban-placeholder.png`).default}/>)*/}
      </ChampionBanSplash>
    </Ban>
  );
});

const Admin = ({ socket }) => {
  const [status, setStatus] = useState("idle");
  const [champions, setChampions] = useState([]);
  const [filter, setFilter] = useState("");
  const [barInfo, setBarInfo] = useState({
    blueTeamInitials: "",
    blueTeamName: "",
    redTeamInitials: "",
    redTeamName: "",
    phaseScores: "",
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
  const [currentPB, setCurrentPB] = useState([
    {id: 1, champion: ""},
    {id: 2, champion: ""},
    {id: 3, champion: ""},
    {id: 4, champion: ""},
    {id: 5, champion: ""},
    {id: 6, champion: ""},
    {id: 7, champion: ""},
    {id: 8, champion: ""},
    {id: 9, champion: ""},
    {id: 10, champion: ""},
    {id: 11, champion: ""},
    {id: 12, champion: ""},
    {id: 13, champion: ""},
    {id: 14, champion: ""},
  ]);
  const [currentSlot, setCurrentSlot] = useState(0);
  const [selectedChampion, setSelectedChampion] = useState("");
  const [timer, setTimer] = useState(0);
  const [startTimer, setStartTimer] = useState(false);

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

  useEffect(() => {
    socket.emit("sendBarInfo", barInfo);
  }, [barInfo]);

  useEffect(() => {
    socket.emit("sendCurrentSlot", currentSlot);
  }, [currentSlot]);

  useEffect(() => {
    socket.emit(
      "sendSelectedChampion",
      selectedChampion,
      currentSlot
    );
  }, [selectedChampion]);

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

  const handeLockIn = () => {
    if (currentSlot <= 13) {
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
    if (currentSlot < 14) {
      setSelectedChampion(e.currentTarget.id);
      let newPB = Array.from(currentPB);
      newPB[currentSlot].champion = e.currentTarget.id;
      setCurrentPB(newPB);
    }
  };

  const swapChampions = (fromItem, toItem) => {
    let newArray = Array.from(currentPB);
    [newArray[fromItem.id].champion, newArray[toItem.id].champion] = [newArray[toItem.id].champion, newArray[fromItem.id].champion]
    socket.emit("sendUpdatedPB", newArray);
    setCurrentPB(newArray);
  };

  const handleDragStart = data => event => {
    let fromItem = JSON.stringify({ id: event.currentTarget.slot });
    event.dataTransfer.setData("dragContent", fromItem);
  };

  const handleDragOver = data => event => {
    event.preventDefault();
    return false;
  };

  const  handleDrop = (data) => event => {
    event.preventDefault();

    let fromItem = JSON.parse(event.dataTransfer.getData("dragContent"));
    let toItem = { id: event.currentTarget.slot };

    swapChampions(fromItem, toItem);
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
      ].name.replace(/[^A-Z0-9']/gi, "")}_square.png`).default;
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
            <Blue>
              <TeamInfoContainer>
                <input
                  id="blue_initials_input"
                  placeholder="Blue Team's Initials"
                  onBlur={(e) => {
                    setBarInfo({ ...barInfo, blueTeamInitials: e.target.value });
                  }}
                />
                <input
                  id="blue_name_input"
                  placeholder="Blue Team's Name"
                  onBlur={(e) => {
                    setBarInfo({ ...barInfo, blueTeamName: e.target.value });
                  }}
                />
              </TeamInfoContainer>
            </Blue>

            <PhaseInfo>
              <input
                id="scores"
                placeholder="Score (ex: 0 - 0)"
                onBlur={(e) => {
                  setBarInfo({ ...barInfo, phaseScores: e.target.value });
                }}
              />
              <input
                id="phase_round_input"
                placeholder="(Ex. Semi-Finals, Finals)"
                onBlur={(e) => {
                  setBarInfo({ ...barInfo, phaseRound: e.target.value });
                }}
              />
              <input
                id="phase_game_input"
                placeholder="(Ex. Game 1/2/3)"
                onBlur={(e) => {
                  setBarInfo({ ...barInfo, phaseGame: e.target.value });
                }}
              />
            </PhaseInfo>

            <Red>
              <TeamInfoContainer>
                <input
                  id="red_initials_input"
                  placeholder="Red Team's Initials"
                  onBlur={(e) => {
                    setBarInfo({ ...barInfo, redTeamInitials: e.target.value });
                  }}
                />
                <input
                  id="red_name_input"
                  placeholder="Red Team's Name"
                  onBlur={(e) => {
                    setBarInfo({ ...barInfo, redTeamName: e.target.value });
                  }}
                />
              </TeamInfoContainer>
            </Red>
          </BarContainer>

          <FlexContainer>
            <BlueContainer>
              <PicksContainer team="blue">
                <PickComponent champion={currentPB[4].champion} handlePlayerIGNs={handlePlayerIGNs} currentSlot={currentSlot} team={"blue"} idx={0} slot={4} key={4} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop}/>
                <PickComponent champion={currentPB[7].champion} handlePlayerIGNs={handlePlayerIGNs} currentSlot={currentSlot} team={"blue"} idx={1} slot={7} key={7} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop}/>
                <PickComponent champion={currentPB[8].champion} handlePlayerIGNs={handlePlayerIGNs} currentSlot={currentSlot} team={"blue"} idx={2} slot={8} key={8} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop}/>
                <PickComponent champion={currentPB[11].champion} handlePlayerIGNs={handlePlayerIGNs} currentSlot={currentSlot} team={"blue"} idx={3} slot={11} key={11} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop}/>
                <PickComponent champion={currentPB[12].champion} handlePlayerIGNs={handlePlayerIGNs} currentSlot={currentSlot} team={"blue"} idx={4} slot={12} key={12} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop}/>
              </PicksContainer>
              <BansContainer team="blue">
                <BanComponent champion={currentPB[0].champion} currentSlot={currentSlot} team={"blue"} idx={0} slot={0} key={0}/>
                <BanComponent champion={currentPB[2].champion} currentSlot={currentSlot} team={"blue"} idx={1} slot={2} key={3}/>
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
                    <input
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
                <Button onClick={handeLockIn}>LOCK IN</Button>
                <Button onClick={handleStartTimer} disabled={startTimer}>START GAME</Button>
              </ButtonRow>
            </SelectionContainer>

            <RedContainer>
              <PicksContainer team="red">
                <PickComponent champion={currentPB[5].champion} handlePlayerIGNs={handlePlayerIGNs} currentSlot={currentSlot} team={"red"} idx={0} slot={5} key={5} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop}/>
                <PickComponent champion={currentPB[6].champion} handlePlayerIGNs={handlePlayerIGNs} currentSlot={currentSlot} team={"red"} idx={1} slot={6} key={6} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop}/>
                <PickComponent champion={currentPB[9].champion} handlePlayerIGNs={handlePlayerIGNs} currentSlot={currentSlot} team={"red"} idx={2} slot={9} key={9} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop}/>
                <PickComponent champion={currentPB[10].champion} handlePlayerIGNs={handlePlayerIGNs} currentSlot={currentSlot} team={"red"} idx={3} slot={10} key={10} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop}/>
                <PickComponent champion={currentPB[13].champion} handlePlayerIGNs={handlePlayerIGNs} currentSlot={currentSlot} team={"red"} idx={4} slot={13} key={13} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop}/>
              </PicksContainer>
              <BansContainer team="red">
                <BanComponent champion={currentPB[1].champion} currentSlot={currentSlot} team={"red"} idx={0} slot={1} key={1}/>
                <BanComponent champion={currentPB[3].champion} currentSlot={currentSlot} team={"red"} idx={1} slot={3} key={2}/>
              </BansContainer>
            </RedContainer>
          </FlexContainer>
        </Container>
      )}
    </>
  );
};

export default Admin;
