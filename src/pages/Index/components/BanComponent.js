import styled from "styled-components";

export const Ban = styled.div`
    flex: 1;
    max-height: 125px;
    transition: 2s;
    overflow: hidden;
    box-sizing: border-box;
    height: inherit;

    ${({team}) => team === "blue" ? (`
        &:nth-child(n+2)::after {
            content: "";
            position: absolute;
            height: 50%;
            background: rgb(153, 153, 153);
            top: 25%;
            width: 1px;
            z-index: 1;
        }
    `) : (`
        &:nth-child(-n+4)::after {
            content: "";
            position: absolute;
            height: 50%;
            background: rgb(153, 153, 153);
            top: 25%;
            width: 1px;
            z-index: 1;
        }
    `)}
`;

export const ChampionBanSplash = styled.div`
    display: flex;
    background-repeat: no-repeat;
    flex-shrink: 0;
    transition: filter 0.5s ease-in-out;

    ${({ blank }) => blank ?
    `
        background-size: 25%;
        background-position: 50% 50% !important;
        height: 100% !important;
        width: 100%;

        &:after {
            content:"";
            border-top:1px solid rgb(255, 255, 255);
            width: 30px;
            transform: rotate(45deg);
            transform-origin: -50% 55%;
        }
    `
    :
    `
        background-size: 70px;
        background-position: 50% 10% !important;
        height: 100%;
        width: 100%;
    `}

    ${({ active }) => active === true &&
    `
        animation: ban-shadow 3s infinite;
        
        @keyframes ban-shadow {
            50% {box-shadow: inset 0px 0px 30px 0px rgb(255, 255, 255);}
        }
    `}

    ${({active, blank}) => (!active && !blank) &&
    `
        filter: grayscale(100%);
    `}
`;

const BanComponent = ({ champion, currentSlot, team, idx, slot }) => {
  var urlBG = champion !== "" && require(`../../../images/cache/11.21.1/champion/${champion.replace(/[^A-Z0-9]/ig, "")}_square.png`).default;
  //style={{ backgroundImage: `url(${urlBG})` }}
  return (
    <Ban team={team} id={`ban_${team}_${idx}`} key={slot}>
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