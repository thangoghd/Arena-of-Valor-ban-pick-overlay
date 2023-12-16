import React, { useState, useEffect } from "react";
import {
  Container,
  BarContainer,
  TeamInfoContainer,
  TeamInitials,
  TeamName,
  GameInfo,
  Score,
  TimerContainer,
  Timer,
  Round,
  Game,
  Blue,
  Red,
  PicksContainer,
  BlueBansContainer,
  RedBansContainer,
} from './Index.elements'

import PickComponent from "./components/PickComponent";
import BanComponent from "./components/BanComponent";

//var order = ['blue', 'red', 'red', 'blue', 'blue', 'red', 'blue', 'red', 'red', 'blue', 'blue', 'red', 'red', 'blue', 'blue', 'red', 'red', 'blue', 'blue', 'red']
var order = ['blue', 'red', 'blue', 'red', 'blue', 'red', 'red', 'blue', 'blue', 'red', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'blue', 'red']

const TimerComponent = React.memo(({currentSlot, startTimer}) => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const timer = seconds > 0 && setInterval(() => {
      setSeconds(seconds - 1);
      if (seconds <= 0) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds])

  useEffect(() => {
    setSeconds(60);
  }, [currentSlot, startTimer])

  if ((currentSlot >= 0 && currentSlot <= 20) && startTimer) {
    return (<Timer id={`timer`}>{`:${seconds}`}</Timer>);
  } else {
    return (<Timer id={`timer`}>{`:00`}</Timer>);
  }
});

const Index = ({ socket }) => {
  const [currentSlot, setCurrentSlot] = useState(0);
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
  const [playerIGNs, setPlayerIGNs] = useState([
    {id: 1, ign: ""},
    {id: 2, ign: ""},
    {id: 3, ign: ""},
    {id: 4, ign: ""},
    {id: 5, ign: ""},
    {id: 6, ign: ""},
    {id: 7, ign: ""},
    {id: 8, ign: ""},
    {id: 9, ign: ""},
    {id: 10, ign: ""},
  ]);
  const [barInfo, setBarInfo] = useState({
    blueTeamInitials: "",
    blueTeamName: "",
    blueTeamScore: "",
    redTeamInitials: "",
    redTeamName: "",
    redTeamScore: "",
    phaseScores: "",
    phaseRound: "",
    phaseGame: "",
  });
  const [startTimer, setStartTimer] = useState(false);

  useEffect(() => {
    socket.on("receiveBarInfo", (barInfo) => {
      setBarInfo(barInfo);
    });

    socket.on("receivePlayerIGNs", (playerIGNs) => {
      setPlayerIGNs(playerIGNs);
    });

    socket.on("receiveCurrentSlot", (currentSlot) => {
      setCurrentSlot(currentSlot);
    });

    socket.on("receiveSelectedChampion", (selectedChampion, currentSlot) => {
      if ((currentSlot >= 0 && currentSlot <= 3) || (currentSlot >= 10 && currentSlot <= 13)) {
        setCurrentBans((previousBans) => {
          const newBans = Object.assign({}, previousBans);
          let idx = newBans[order[currentSlot]].findIndex(x => x.id === currentSlot);
          newBans[order[currentSlot]][idx].champion = selectedChampion;
          return newBans;
        })
      }
  
      else if ((currentSlot >= 4 && currentSlot <= 9) || (currentSlot >= 14 && currentSlot <= 17)) {
        setCurrentPicks((previousPicks) => {
          const newPicks = Object.assign({}, previousPicks);
          let idx = newPicks[order[currentSlot]].findIndex(x => x.id === currentSlot);
          newPicks[order[currentSlot]][idx].champion = selectedChampion;
          return newPicks;
        })
      }
    });

    socket.on("receiveCurrentSlot", (currentSlot) => {
      setCurrentSlot(currentSlot);
    });

    socket.on("receiveStartTimer", () => {
      setStartTimer(true);
    });

    socket.on("receiveUpdatedPicks", (newPicks) => {
      setCurrentPicks(newPicks);
    });
  }, []);

  return (
    <Container>
      <BarContainer>
        <Blue>
          <TeamInfoContainer>
            <TeamInitials id="blue_initials">
              {barInfo.blueTeamInitials}
            </TeamInitials>
            <TeamName id="blue_name">
              {barInfo.blueTeamName}
            </TeamName>
          </TeamInfoContainer>
          <Score>{barInfo.blueTeamScore}</Score>
        </Blue>

        <GameInfo>
          <TimerContainer>
              <TimerComponent currentSlot={currentSlot} startTimer={startTimer}/>
            </TimerContainer>
          <Round id={"phase_round"}>{barInfo.phaseRound}</Round>
          <Game id={"phase_game"}>{barInfo.phaseGame}</Game>
        </GameInfo>

        <Red>
          <TeamInfoContainer>
            <TeamInitials id="red_initials">
              {barInfo.redTeamInitials}
            </TeamInitials>
            <TeamName id="red_name">
              {barInfo.redTeamName}
            </TeamName>
          </TeamInfoContainer>
          <Score>{barInfo.redTeamScore}</Score>
        </Red>
      </BarContainer>

      <PicksContainer id="picks_blue" team="blue">
        {currentPicks.blue.map((pick, idx) => {
          return (
            <PickComponent  team={"blue"} idx={idx} slot={pick.id} key={pick.id} champion={pick.champion} playerIGN={playerIGNs[idx].ign} currentSlot={currentSlot}/>
          )
        })}
      </PicksContainer>
      <PicksContainer id="picks_red" team="red">
        {currentPicks.red.map((pick, idx) => {
          return (
            <PickComponent  team={"red"} idx={idx} slot={pick.id} key={pick.id} champion={pick.champion} playerIGN={playerIGNs[idx+5].ign} currentSlot={currentSlot}/>
          )
        })}
      </PicksContainer>

      <BlueBansContainer id="bans_blue">
        {currentBans.blue.map((ban, idx) => {
          return (
            <BanComponent team={"blue"} idx={idx} slot={ban.id} key={ban.id} champion={ban.champion} currentSlot={currentSlot}/>
          )
        })}
      </BlueBansContainer>
      <RedBansContainer className={"bans red"} id="bans_red">
        {currentBans.red.map((ban, idx) => {
          return (
            <BanComponent team={"red"} idx={idx} slot={ban.id} key={ban.id} champion={ban.champion} currentSlot={currentSlot}/>
          )
        })}
      </RedBansContainer>
    </Container>
  );
};

export default Index;
