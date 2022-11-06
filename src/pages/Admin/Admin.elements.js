import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    overflow-x: hidden;
    background-color: #181A28;
`

export const Input = styled.input`
    max-height: 20px;
`;

export const BarContainer = styled.div`
    position: relative;
    height: 80px;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export const TeamInfoContainer = styled.div`
    margin: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-item: center;
`;

export const TeamBar = styled.div`
    position: absolute;
    top: 0;
    width: 36%;
    height: inherit;
    display: flex;
    flex-directon: row;
    justify-content: space-between;
    align-items: center;

    ${({team}) => team === 'blue' && (`
        left: 0px;
        background-color: #0e97a7;
    `)}

    ${({team}) => team === 'red' && (`
        right: 0px;
        background-color: #c01f32;
    `)}
`;

export const GameInfoBar = styled.div`
    width: 100%;
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    & > input {
        width: 20%;
    }
`

export const PicksContainer = styled.div`
    width: 300px;
    height: 600px;
    display: flex;
    flex-direction: column;
`
export const BansContainer = styled.div`
    height: 80px;
    display: flex;
    flex-direction: row;
`

export const SelectionContainer = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
`
export const Options = styled.div`
    width: 90%;
    color: white;
    background-color: black;
    display: flex;
`
export const UnorderedList = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    list-style-type: none;
`

export const ListItem = styled.li``

export const ChampionsContainer = styled.div`
    width: 90%;
    height: 400px;
    background-color: #191919;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
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
    flex-direction: row;
    align-items: center;
    justify-content: center;
`