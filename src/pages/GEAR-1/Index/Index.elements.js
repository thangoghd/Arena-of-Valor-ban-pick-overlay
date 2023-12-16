import styled from "styled-components";
import GlobalFonts from "../../fonts/fonts";

export const Container = styled.div`
    width: 1920px;
    height: 1920px;
`;

export const BarContainer = styled.div`
    position: relative;
    height: 160px;
    width: 100%;
    background-color: white;
`;

export const TeamInfoContainer = styled.div`
    margin: 0;
    position: absolute;
    top: 50%;
`;

export const TeamInitials = styled.div`
    font: 900 100px "Montserrat", sans-serif;
    text-transform: uppercase;
    display: block;
    line-height: 100px;
`;

export const TeamName = styled.div`
    font: 500 20px "Montserrat", sans-serif;
    text-transform: uppercase;
    display: block;
    line-height: 20px;
`;

export const Timer = styled.div`
    color: white;
    font-family: "Cornerstone";
    font-size: 70px;
`;

export const PhaseInfo = styled.div`
    width: 100%;
    text-align: center;
    height: inherit;
    font: 500 25px "Montserrat", sans-serif;
    margin-top: -5px;
`;

export const PhaseInfoText = styled.div``;

export const PhaseGame = styled.div`
    position: absolute;
    top: 120px;
    left: 840px;
    border-top: 40px solid #ff073a;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    height: 0;
    width: 220px;

    & > ${PhaseInfoText} {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -120%);
        text-align: center;
        color: white;
    }
`;

export const ScoreText = styled.div`
    font-size: 75px;
    line-height: 85px;
`;

export const Blue = styled.div`
    position: absolute;
    left: -25px;
    top: 0;
    height: inherit;
    width: 36%;
    direction: rtl;
    background-color: #0e97a7;
    transform: skew(14deg);
    text-indent: 75px;

    & > ${TeamInfoContainer} {
        transform: skew(-14deg) translateY(-50%);
    }
`;

export const Red = styled.div`
    position: absolute;
    right: -25px;
    top: 0;
    height: inherit;
    width: 36%;
    background-color: #c01f32;
    transform: skew(-14deg);
    text-indent: 75px;

    & > ${TeamInfoContainer} {
        transform: skew(14deg) translateY(-50%);
    }
`;

export const TimerContainer = styled.div`
    position: absolute;
    width: 8%;
    height: inherit;
    top: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    ${({team}) => team === "blue" ? 
    `left: 670px; transform: skew(14deg);
    & > ${Timer} {
        transform: skew(-14deg);
    }`
    :
    `right: 670px; transform: skew(-14deg);
    & > ${Timer} {
        transform: skew(14deg);
    }`}

    ${({active, team}) => active ?
    (
        team === "blue" ? `background-color: #0e97a7;` : `background-color: #c01f32;`
    )
    :
    `
        background-color: #141414;
    `}
`;

export const Pick = styled.div`
    position: relative;
    width: 100%;
    border: 1px solid black;
    flex-grow: 1;
`;

export const ChampionPickSplash = styled.div`
    height: 100%;
    width: 100%;

    transition: background-color 0.5s ease, opacity 0.75s;

    border-width: 0px;

    ${({ blank }) => blank ? 
    `
        background-size: 15%;
        background-color: #141414;
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
            50% {box-shadow: inset 0px 0px 40px white;}
        }
    `}
`;

export const ChampionName = styled.div`
    color: white;
    font-weight: 500;
    position: absolute;
    left: 10px;
    bottom: 35px;
`;

export const PlayerName = styled.div`
    color: white;
    font-weight: 700;
    font-type: italic;
    font-size: 30px;
    position: absolute;
    left: 10px;
    bottom: 0;
`;

export const PicksContainer = styled.div`
    position: absolute;
    top: 180px;
    ${({team}) => team === "blue" ? `left: 0;` : `right: 0;`}
    width: 500px;
    height: 750px;

    display: flex;
    flex-direction: column;

    background-color: var(--debug-color-green);

    & > ${Pick} > ${PlayerName},${ChampionName} {
        ${({team}) => team === "blue" ?
        `
            right: 10px;
            text-align: right;
        ` :
        `
            left: 10px;
            text-align:left;
        `}
    }
`;

export const Ban = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 45%;
    height: 80px;
    box-sizing: border-box;
    transform: skewX(14deg);
    height: inherit;
    border: 1px solid black;
`;

export const ChampionBanSplash = styled.div`
    display: flex;
    background-repeat: no-repeat;
    transform: skewX(-14deg);
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
`;

export const BlueBansContainer = styled.div`
    overflow: hidden;
    position: absolute;
    top: 950px;
    width: 528px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

export const RedBansContainer = styled.div`
    overflow: hidden;
    position: absolute;
    top: 950px;
    width: 528px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    right: 0;
    flex-direction: row-reverse;

    & > ${Ban} {
        transform: skewX(-14deg);
    }

    & > ${Ban} > ${ChampionBanSplash} {
        transform: skewX(14deg);
    }
`;

export const BanSymbol = styled.div`
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: 25%;
    background-position: 50% 50% !important;
    height: 100% !important;
    width: 100%;
`