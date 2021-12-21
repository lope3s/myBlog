import {Container, HeaderContainer} from './style';
import {ImageContainer} from '../ImageContainer';
import React, {useEffect} from 'react';
import {useStoreState} from 'easy-peasy';
import {IMainModel, IKeyboardModel} from '../../Types';

export const Header: React.FC = ({children}) => {
  const {status} = useStoreState<IMainModel, IKeyboardModel>(
    state => state.keyboardModel,
  );

  useEffect(() => {}, [status]);

  return (
    <Container>
      {status ? null : (
        <HeaderContainer>
          <ImageContainer />
        </HeaderContainer>
      )}
      {children}
    </Container>
  );
};
