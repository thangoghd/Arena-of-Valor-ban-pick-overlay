import styled from "styled-components";

export const ChampionPickSplash = styled.div`
    height: 100%;
    width: 100%;

    transition: background-color 0.5s ease, opacity 0.75s;

    border-width: 0px;

    ${({ blank }) => blank ? 
    `
        background-size: 15%;
        background-position: 50% 50%;
        background-repeat: no-repeat;
    `
    : 
    `
        background-size: 100%;
        background-position: 20% 25%;
    `}

    ${({ active }) => active === true &&
    `
        animation: pick-shadow 3s infinite;
        
        @keyframes pick-shadow {
            50% {box-shadow: inset 0 -150px 100px -100px rgb(219, 200, 93);}
        }
    `}
`;

export const ChampionName = styled.div`
    color: white;
    font: italic 100 20px 'Montserrat', sans-serif;
    position: absolute;
    left: 10px;
    top: 5%;
`;

export const PlayerName = styled.div`
    position: absolute;
    left: 10px;
    bottom: 0;
    color: white;
    font-family: Vegan Abattoir;
    font-weight: 700;
    font-size: 25px;
    letter-spacing: 5px;
    text-transform: uppercase;
`;

export const Pick = styled.div`
    & {
        position: relative;
        width: 100%;
        flex: 1;
        transition: 2s;
    }

    &:after {
        content: "";
        position: absolute;
        height: 1px;
        background: rgba(255, 255, 255, .25);
        top: 100%;
        width: 500px;
        z-index: 1;
    }

    & > ${PlayerName},${ChampionName} {
        ${({team}) => team === "blue" ?
        `
            right: 10px;
            text-align: right;
        ` :
        `
            left: 10px;
            text-align: left;
        `}
    }

     ${({phase}) => phase === 'three-big-two-small' ? (`
        &:nth-child(n+1) {
            flex: 3 1 0;
        }

        &:nth-child(n+4) {
            flex: 1 1 0;
        }
    `) : phase === 'three-small-two-big' && (`
        &:nth-child(n+1) {
            flex: 1 1 0;
        }

        &:nth-child(n+4) {
            flex: 3 1 0;
        }
    `)}
`;

var roles = ["top", "jungle", "middle", "bottom", "utility"];

const PickComponent = ({ phase, champion, playerIGN, currentSlot, team, idx, slot }) => {
  var urlBG = champion === "" ? require(`../../../images/role-${roles[idx]}.png`).default : require(`../../../images/cache/11.21.1/champion/${champion.replace(/[^A-Z0-9]/ig, "")}_centered_splash.jpg`).default;
  return (
    <Pick team={team} id={`"pick_${team}_${idx}"`} key={slot} phase={phase}>
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
};

export default PickComponent;