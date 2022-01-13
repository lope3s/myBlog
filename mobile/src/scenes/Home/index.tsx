import React, {ReactElement, useState} from 'react';
import {View, Text} from 'react-native';
import {useStoreState} from 'easy-peasy';
import {IUserModel, IMainModel} from '../../Types';
import {useQuery} from '@apollo/client';
import {GET_ALL_POSTS} from '../../GraphQueries/homeQueries';
import {Container, PostCards, ContentBox} from './style';

const Home: React.FC = () => {
  const {user} = useStoreState<IMainModel, IUserModel>(
    state => state.userModel,
  );

  const {data, loading, error} = useQuery(GET_ALL_POSTS);

  if (error) {
    console.log({error});
  }

  if (data) {
    console.log(data);
  }

  const renderItem = ({item: {content, user}}: any) => {
    return (
      <PostCards>
        <Text style={{alignSelf: 'flex-start', marginLeft: '10%'}}>
          {user.userName}
        </Text>
        <ContentBox>{content}</ContentBox>
      </PostCards>
    );
  };

  return (
    <Container data={data ? data.getAllPosts : []} renderItem={renderItem} />
  );
};

export default Home;
