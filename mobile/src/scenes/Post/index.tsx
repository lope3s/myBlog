import React, {useEffect, useState} from 'react';
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
import {useMutation} from '@apollo/client';
import {CREATE_POST_QUERY} from '../../GraphQueries/postQueries';
import {GET_ALL_POSTS} from '../../GraphQueries/homeQueries';
import {InformationModal} from '../../components/informationModal';
import SuccessIcon from 'react-native-vector-icons/Entypo';
import FaliureIcon from 'react-native-vector-icons/FontAwesome';

const Post: React.FC = () => {
  const user = useStoreState<IMainModel, IUser>(state => state.userModel.user);
  const updateState = useStoreActions<IMainModel>(
    actions => actions.keyboardModel.updateStatus,
  );
  const [postMutation, {data, loading, error, reset}] = useMutation(
    CREATE_POST_QUERY,
    {refetchQueries: [GET_ALL_POSTS]},
  );

  const createPost = async (data: any) => {
    Keyboard.dismiss();
    updateState(false);
    try {
      const post = await postMutation({variables: data});

      if (post?.data) {
        resetForm();
      }

      setTimeout(reset, 3500);
    } catch (e: any) {
      console.log({e});
    }
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      updateState(true);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      updateState(false);
    });
  }, []);

  const {values, handleChange, errors, handleSubmit, resetForm} = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: Yup.object({
      content: Yup.string().required('Digite algo para criar um post!'),
    }),
    onSubmit: createPost,
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
      {error ? (
        <InformationModal text={'Não foi possível criar seu post'}>
          <FaliureIcon name="close" size={25} color="#f00" />
        </InformationModal>
      ) : null}
      {data?.post ? (
        <InformationModal text={data.post.message}>
          <SuccessIcon name="check" size={25} color="#0f0" />
        </InformationModal>
      ) : null}
    </Container>
  );
};

export default Post;
