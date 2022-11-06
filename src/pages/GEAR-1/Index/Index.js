import React, { useState, useEffect } from "react";
import {
  Container,
  BarContainer,
  TeamInfoContainer,
  TeamInitials,
  TeamName,
  Timer,
  PhaseInfo,
  PhaseGame,
  ScoreText,
  PhaseInfoText,
  Blue,
  Red,
  TimerContainer,
  PicksContainer,
  Pick,
  ChampionPickSplash,
  ChampionName,
  PlayerName,
  BlueBansContainer,
  RedBansContainer,
  Ban,
  ChampionBanSplash,
  BanSymbol,
} from './Index.elements'

var roles = ["top", "jungle", "middle", "bottom", "utility"];
var order = ["blue", "red", "blue", "red", "blue", "red", "red", "blue", "blue", "red", "red", "blue", "blue", "red"];

const PickComponent = React.memo(({ champion, playerIGN, currentSlot, team, idx, slot }) => {
  console.log(champion);
  var urlBG = champion === "" ? require(`../../images/role-${roles[idx]}.png`).default : require(`../../images/cache/11.21.1/champion/${champion.replace(/[^A-Z0-9's]/ig, "")}_centered_splash.jpg`).default;
  return (
    <Pick id={`"pick_${team}_${idx}"`} key={slot}>
      <ChampionPickSplash
        blank={champion === "" ? true : false}
        active={slot === currentSlot ? true : false}
        style={{ backgroundImage: `url(${urlBG})` }}
        id={`"pick_${team}_splash_${idx}"`}
      />
      <ChampionName id={`"pick_${team}_champ_${idx}"`}>{champion}</ChampionName>
      <PlayerName className={"text-ign"} id={`"pick_${team}_ign_${idx}"`}>{playerIGN}</PlayerName>
    </Pick>
  );
});

const BanComponent = React.memo(({ champion, currentSlot, team, idx, slot }) => {
  console.log(champion);
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

const TimerComponent = React.memo(({team, currentSlot, startTimer}) => {
  const [seconds, setSeconds] = useState(25);

  useEffect(() => {
    const timer = seconds > 0 && setInterval(() => {
      setSeconds(seconds - 1);
      if (seconds <= 0) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds])

  useEffect(() => {
    setSeconds(25);
  }, [currentSlot, startTimer])
 
  if ((team === order[currentSlot] && startTimer) || currentSlot === 14) {
    return(
      <TimerContainer team={team} active={team === order[currentSlot] || currentSlot === 14 ? true : false}>
        <Timer id={`${team}_timer`}>{team === order[currentSlot] || currentSlot === 14 ? (`:${seconds}`) : ("")}</Timer>
      </TimerContainer>
    )
  } else {
    return(
      <TimerContainer team={team} active={false}>
        <Timer id={`${team}_timer`}>{""}</Timer>
      </TimerContainer>
    )
  }
});

const Index = ({ socket }) => {
  const [currentSlot, setCurrentSlot] = useState(0);
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
      if (currentSlot <= 13) {
        setCurrentPB((previousPB) => {
          const newPB = Array.from(previousPB);
          newPB[currentSlot].champion = selectedChampion;
          return newPB;
        });
      }
    });

    socket.on("receiveCurrentSlot", (currentSlot) => {
      setCurrentSlot(currentSlot);
    });

    socket.on("receiveStartTimer", () => {
      setStartTimer(true);
    });

    socket.on("receiveUpdatedPB", (updatedPB) => {
      setCurrentPB(updatedPB);
    });
  }, []);

  return (
    <Container>
      {console.log("render from index")}
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
        </Blue>

        <TimerComponent team="blue" currentSlot={currentSlot} startTimer={startTimer}/>

        <PhaseInfo>
          <ScoreText id={"scores"}>{barInfo.phaseScores}</ScoreText>
          <PhaseInfoText id={"phase_round"}>{barInfo.phaseRound}</PhaseInfoText>
          <PhaseGame>
            <PhaseInfoText id={"phase_game"}>{barInfo.phaseGame}</PhaseInfoText>
          </PhaseGame>
        </PhaseInfo>

        <TimerComponent team="red" currentSlot={currentSlot} startTimer={startTimer}/>

        <Red>
          <TeamInfoContainer>
            <TeamInitials id="red_initials">
              {barInfo.redTeamInitials}
            </TeamInitials>
            <TeamName id="red_name">
              {barInfo.redTeamName}
            </TeamName>
          </TeamInfoContainer>
        </Red>
      </BarContainer>

      <PicksContainer id="picks_blue" team="blue">
        <PickComponent champion={currentPB[4].champion} playerIGN={playerIGNs[0].ign} currentSlot={currentSlot} team={"blue"} idx={0} slot={4} key={4}/>
        <PickComponent champion={currentPB[7].champion} playerIGN={playerIGNs[1].ign} currentSlot={currentSlot} team={"blue"} idx={1} slot={7} key={7}/>
        <PickComponent champion={currentPB[8].champion} playerIGN={playerIGNs[2].ign} currentSlot={currentSlot} team={"blue"} idx={2} slot={8} key={8}/>
        <PickComponent champion={currentPB[11].champion} playerIGN={playerIGNs[3].ign} currentSlot={currentSlot} team={"blue"} idx={3} slot={11} key={11}/>
        <PickComponent champion={currentPB[12].champion} playerIGN={playerIGNs[4].ign} currentSlot={currentSlot} team={"blue"} idx={4} slot={12} key={12}/>
      </PicksContainer>
      <PicksContainer id="picks_red" team="red">
        <PickComponent champion={currentPB[5].champion} playerIGN={playerIGNs[5].ign} currentSlot={currentSlot} team={"red"} idx={0} slot={5} key={5}/>
        <PickComponent champion={currentPB[6].champion} playerIGN={playerIGNs[6].ign} currentSlot={currentSlot} team={"red"} idx={1} slot={6} key={6}/>
        <PickComponent champion={currentPB[9].champion} playerIGN={playerIGNs[7].ign} currentSlot={currentSlot} team={"red"} idx={2} slot={9} key={9}/>
        <PickComponent champion={currentPB[10].champion} playerIGN={playerIGNs[8].ign} currentSlot={currentSlot} team={"red"} idx={3} slot={10} key={10}/>
        <PickComponent champion={currentPB[13].champion} playerIGN={playerIGNs[9].ign} currentSlot={currentSlot} team={"red"} idx={4} slot={13} key={13}/>
      </PicksContainer>

      <BlueBansContainer id="bans_blue">
        <BanComponent champion={currentPB[0].champion} currentSlot={currentSlot} team={"blue"} idx={0} slot={0} key={0}/>
        <BanComponent champion={currentPB[2].champion} currentSlot={currentSlot} team={"blue"} idx={1} slot={2} key={2}/>
      </BlueBansContainer>
      <RedBansContainer className={"bans red"} id="bans_red">
        <BanComponent champion={currentPB[1].champion} currentSlot={currentSlot} team={"red"} idx={0} slot={1} key={1}/>
        <BanComponent champion={currentPB[3].champion} currentSlot={currentSlot} team={"red"} idx={1} slot={3} key={3}/>
      </RedBansContainer>
    </Container>
  );
};

export default Index;
