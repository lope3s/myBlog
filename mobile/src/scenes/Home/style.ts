import styled from 'styled-components/native';

export const Container = styled.FlatList`
  background-color: #1f1d36;
`;

export const PostCards = styled.View`
  width: 85%;
  height: 300px;
  border-radius: 5px;
  background-color: #e9a6a6;
  margin: 2% auto;
  align-items: center;
  justify-content: center;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  width: 80%;
  height: 60px;
`;

export const ContentBox = styled.Text`
  width: 80%;
  background-color: #da949470;
  height: 150px;
  border-radius: 5px;
  padding: 10px;
`;

export const CardFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 2%;
  width: 80%;
`;
