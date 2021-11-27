import React from 'react';
import Tabbar from '../../components/Tabbar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import Profile from '../Profile'
import Post from '../Post'

const Tab = createBottomTabNavigator();

const InnerAppPagination: React.FC = () => {

    return (
        <Tab.Navigator tabBar = {({navigation}) => <Tabbar navigation = {navigation}/>} screenOptions = {{headerShown: false}}>
            <Tab.Screen name = "Home" component = {Home}/>
            <Tab.Screen name = "Post" component = {Post} />
            <Tab.Screen name = "Profile" component = {Profile}/>
        </Tab.Navigator>
    )
}

export default InnerAppPagination