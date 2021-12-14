import React, {useEffect} from 'react';
import {Keyboard} from 'react-native';
import {
  Container,
  CardsContainer,
  Card,
  TextView,
  CardTitle,
  CardInfo,
} from './style';
import {Button} from '../../components/Button';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {IMainModel, IUser} from '../../Types';

const Post: React.FC = () => {
  const user = useStoreState<IMainModel, IUser>(state => state.userModel.user);
  const updateState = useStoreActions<IMainModel>(
    actions => actions.keyboardModel.updateStatus,
  );

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      console.log('executado');
      updateState(true);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      console.log('executado2');
      updateState(false);
    });
  }, []);

  return (
    <Container>
      <CardsContainer>
        <Card>
          <CardInfo>
            <CardTitle>{user.userName}</CardTitle>
          </CardInfo>
          <TextView
            multiline
            textAlignVertical="top"
            numberOfLines={18}
            placeholder="Sobre o que quer falar hoje?"
          />
        </Card>
        <Button text="Publicar" />
      </CardsContainer>
    </Container>
  );
};

export default Post;
