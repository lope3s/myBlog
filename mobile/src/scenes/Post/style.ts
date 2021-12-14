import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: #1f1d36;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardsContainer = styled.View`
  width: 90%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const Card = styled.View`
  background-color: #e9a6a6;
  width: 100%;
  height: 80%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TextView = styled.TextInput`
  width: 90%;
  background-color: #de9999;
  border-radius: 10px;
  padding: 10px;
`;

export const CardInfo = styled.View`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 20%;
`;

export const CardTitle = styled.Text`
  font-size: 20px;
  color: #000;
`;
