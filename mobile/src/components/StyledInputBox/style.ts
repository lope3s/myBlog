import styled from "styled-components/native";

interface IInputBox {
    width: string
}

export const InputBox = styled.View<IInputBox>`
    width: ${props => props.width};
    border: 2px solid #3F3351;
    border-radius: 5px;
    margin-bottom: 20px;
`

export const IconBox = styled.View`
    width: 20%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
`

export const Input = styled.TextInput`
    width: 100%;
    height: 50px;
    background-color: #09071F50;
    padding-left: 60px;
    color: #fff;
    font-size: 18px;
`