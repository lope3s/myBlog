import styled from 'styled-components/native';

export const View = styled.View`
  background-color: #1f1d36;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainContent = styled.View`
  width: 80%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainLogo = styled.Text`
  font-size: 45px;
  color: #fff;
  margin-top: 20%;
  margin-bottom: 10%;
`;

export const Link = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

export const ErrorMessage = styled.Text`
  color: #f00;
  margin-top: 2.5%;
`;
