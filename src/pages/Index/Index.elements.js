import styled from "styled-components";

export const Container = styled.div`
    width: 1920px;
    height: 1080px;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
`;

export const BarContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100px;
    width: 100%;
    text-transform: uppercase;
    position: fixed;
    bottom: 0;
    left: 0;
`;

export const TeamInfoContainer = styled.div`
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    color: #FFFFFF;
`;

export const TeamInitials = styled.div`
    font-family: Akira Expanded;
    font-size: 65px;
    line-height: 65px;
    text-transform: uppercase;
`;

export const TeamName = styled.div`
    font: 600 12px "Montserrat", sans-serif;
    letter-spacing: 14px;
    text-transform: uppercase;
`;

export const Game = styled.div`
    font-size: 14px;
    margin-bottom: 5px;
`;
export const Round = styled.div`
    font-size: 20px;
`;

export const Timer = styled.div`
    font-size: 40px;
`;

export const TimerContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
`

export const GameInfo = styled.div`
    width: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    background-color: #FFFFFF;
`;

export const PhaseInfoText = styled.div``;

export const Score = styled.div`
    color: #FFFFFF;
    font-size: 100px;
    font-weight: 500;
    font: 500 100px 'Montserrat', sans-serif;
`;

export const Blue = styled.div`
    width: 45%;
    height: inherit;
    background: linear-gradient(90deg, rgba(23,0,96,1) 0%, rgba(2,118,219,1) 100%);
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > ${TeamInfoContainer} {
        margin-left: 40px;
    }
    
    & > ${Score} {
        margin-right: 50px;
    }
`;

export const Red = styled.div`
    width: 45%;
    height: inherit;
    direction: rtl;
    background: linear-gradient(-90deg, rgba(112,1,1,1) 0%, rgba(252,3,3,1) 100%);
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > ${TeamInfoContainer} {
        margin-right: 40px;
    }

    & > ${Score} {
        margin-left: 50px;
    }
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
        width: 450px;
        z-index: 1;
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
    font-weight: 500;
    position: absolute;
    left: 10px;
    bottom: 35px;
`;

export const PlayerName = styled.div`
    color: white;
    font-weight: 500;
    font-type: italic;
    font-size: 30px;
    position: absolute;
    left: 10px;
    bottom: 0;
`;

export const PicksContainer = styled.div`
    position: absolute;
    top: 730px;
    ${({team}) => team === "blue" ? `left: 0;` : `right: 0;`}
    width: 865px;
    height: 250px;

    display: flex;
    flex-direction: row;

    background-color: rgba(18,23,26,.9);

    ${({team}) => team === 'red' && (`
        ${Pick}:after {
            right: 0px;
        }   
    `)}
`;

export const BlueBansContainer = styled.div`
    overflow: hidden;
    position: absolute;
    top: 980px;
    left: 412px;
    width: 280px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color:rgba(9,12,13, 0);
`;

export const RedBansContainer = styled.div`
    overflow: hidden;
    position: absolute;
    top: 980px;
    right: 412px;
    width: 280px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row-reverse;
    background-color:rgba(9,12,13, 0);
`;

export const BanSymbol = styled.div`
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: 25%;
    background-position: 50% 50% !important;
    height: 100% !important;
    width: 100%;
`
