import React from 'react';
import {View, Text} from 'react-native';
import {useStoreState} from 'easy-peasy';
import {IUserModel, IMainModel} from '../../Types';
import {useQuery} from '@apollo/client';
import {GET_ALL_POSTS} from '../../GraphQueries/homeQueries';

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

  return (
    <View>
      <Text>Home Page</Text>
    </View>
  );
};

export default Home;
