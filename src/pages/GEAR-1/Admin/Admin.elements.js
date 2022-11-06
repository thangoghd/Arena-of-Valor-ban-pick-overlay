import styled from "styled-components";
import GlobalFonts from "../../fonts/fonts";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #181A28;
`
export const BarContainer = styled.div`
    position: relative;
    height: 80px;
    width: 100%;
    background-color: white;
`;

export const TeamInfoContainer = styled.div`
    margin: 0;
    position: relative;
    top: 50%;

    & > input {
        display: block;
    }
`;

export const Blue = styled.div`
    position: absolute;
    left: -25px;
    top: 0;
    height: inherit;
    width: 36%;
    direction: rtl;
    background-color: #0e97a7;
    text-indent: 75px;

    & > ${TeamInfoContainer} {
        transform: translateY(-50%) translateX(-10%);
    }
`
export const Red = styled.div`
    position: absolute;
    right: -25px;
    top: 0;
    height: inherit;
    width: 36%;
    background-color: #c01f32;
    text-indent: 75px;

    & > ${TeamInfoContainer} {
        transform: translateY(-50%) translateX(10%);
    }
`
export const PhaseInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
    height: inherit;
    
    & > input {
        width: 20%;
    }
`

export const Pick = styled.div`
    position: relative;
    width: 100%;
    border: 1px solid black;
    flex-grow: 1;

    & > input {
        position: absolute;
        bottom: 0px;
    }
`
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
`

export const ChampionName = styled.div`
    color: white;
    font-weight: 500;
    position: absolute;
    left: 10px;
    bottom: 35px;
`

export const PicksContainer = styled.div`

    width: 300px;
    height: 600px;

    display: flex;
    flex-direction: column;

    background-color: var(--debug-color-green);

    & > ${Pick} > ${ChampionName}, input {
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
`
export const BansContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 80px;
`
export const Ban = styled.div`
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
export const ChampionBanSplash = styled.div`
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

export const SelectionContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const Options = styled.div`
    display: flex;
    width: 90%;
    background-color: black;
    color: white;
`
export const UnorderedList = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    list-style-type: none;
`
export const ListItem = styled.li`
    &:last-child {
       
    }
`
export const ChampionsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    background-color: #191919;
    width: 90%;
    height: 400px;
    overflow: auto;
    box-shadow: inset 0 0 10px #000000;
`
export const Champion = styled.div`
    width: 60px;
    height: 60px;
    margin: 10px;
    text-align: center;
    line-height: 75px;
    font-size: 30px;
`

export const ChampionSplash = styled.div`
    width: 60px;
    height: 60px;
    background-size: cover;
`
export const Button = styled.button`
    border: none;
    color: white;
    padding: 20px 50px;
    margin: 30px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;

    ${props =>
        props.disabled ?
        `background-color: #9C6E4B;`
        :
        `background-color: #F48A3C;`
    }
`

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
`

export const BlueContainer = styled.div``

export const RedContainer = styled.div`
    & > ${BansContainer} {
        direction: rtl;
    }
`

export const ButtonRow = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`