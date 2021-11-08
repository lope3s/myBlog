import styled from 'styled-components/native';

export  const View = styled.View`
    background-color: #1F1D36;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const MainContent = styled.View`
    width: 80%;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const MainLogo = styled.Text`
    font-size: 45px;
    color: #fff;
    margin-top: 20%;
    margin-bottom: 10%;
`

export const Button = styled.Pressable`
    background-color: #86487970;
    height: 50px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 5%;
`

export const Link = styled.Pressable`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
`