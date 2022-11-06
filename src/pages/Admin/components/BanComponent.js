import styled from "styled-components";

const Ban = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 50%;
    height: 80px;
    box-sizing: border-box;
    height: inherit;
    border: 1px solid black;
`
const ChampionBanSplash = styled.div`
    display: flex;
    background-repeat: no-repeat;
    flex-shrink: 0;
    transition: filter 0.5s ease-in-out;

    ${({ blank }) => blank ?
    `
        background-size: 25%;
        background-color: #141414;
        background-position: 50% 50% !important;
        height: 120% !important;
        width: 120%;
    `
    :
    `
        background-size: cover;
        background-position: 50% 0% !important;
        height: 125%;
        width: 130%;
    `}

    ${({ active }) => active === true &&
    `
        animation: pick-shadow 3s infinite;
        
        @keyframes pick-shadow {
            50% {box-shadow: inset 0px 0px 40px white;}
        }
    `}

    ${({active, blank}) => (!active && !blank) &&
    `
        filter: grayscale(100%);
    `}
`

const BanComponent = ({ champion, currentSlot, team, idx, slot }) => {
    var urlBG = champion === "" ? require(`../../../images/ban-placeholder.png`).default : require(`../../../images/cache/11.21.1/champion/${champion.replace(/[^A-Z0-9]/ig, "")}_square.png`).default;
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
};

export default BanComponent;