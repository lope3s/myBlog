import React from 'react';
import {View, Text} from 'react-native';
import {useStoreState} from 'easy-peasy';
import {IUserModel, IMainModel} from '../../Types';
import {getItem} from '../../Services/AsyncStoraServices';

const Home: React.FC = () => {
  const {user} = useStoreState<IMainModel, IUserModel>(
    state => state.userModel,
  );

  return (
    <View>
      <Text>Home Page</Text>
    </View>
  );
};

export default Home;
