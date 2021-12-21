import React, {useEffect} from 'react';
import Tabbar from '../../components/Tabbar';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Home';
import Profile from '../Profile';
import Post from '../Post';
import {useStoreState} from 'easy-peasy';
import {IMainModel, IKeyboardModel} from '../../Types';
import {Header} from '../../components/Header';

const Tab = createBottomTabNavigator();

const InnerAppPagination: React.FC = () => {
  const {status} = useStoreState<IMainModel, IKeyboardModel>(
    state => state.keyboardModel,
  );

  useEffect(() => {}, [status]);

  return (
    <Header>
      <Tab.Navigator
        tabBar={({navigation}) =>
          status ? null : <Tabbar navigation={navigation} />
        }
        screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Post" component={Post} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </Header>
  );
};

export default InnerAppPagination;
