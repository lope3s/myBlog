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
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import {CREATE_POST_QUERY} from '../../GraphQueries/postQueries';


const Post: React.FC = () => {
  const user = useStoreState<IMainModel, IUser>(state => state.userModel.user);
  const updateState = useStoreActions<IMainModel>(
    actions => actions.keyboardModel.updateStatus,
  );

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      updateState(true);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      updateState(false);
    });
  }, []);

  const {values, handleChange, errors, handleSubmit} = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: Yup.object({
      content: Yup.string().required('Digite algo para criar um post!'),
    }),
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <Container>
      <CardsContainer>
        <Card>
          <CardInfo>
            <CardTitle>{user.userName}</CardTitle>
          </CardInfo>
          <TextView
            value={values.content}
            onChangeText={handleChange('content')}
            multiline
            textAlignVertical="top"
            placeholder="Sobre o que quer falar hoje?"
          />
        </Card>
        <Button onPress={handleSubmit} text="Publicar" />
      </CardsContainer>
    </Container>
  );
};

export default Post;
