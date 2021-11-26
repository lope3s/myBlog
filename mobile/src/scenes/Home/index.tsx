import React from 'react';
import { View, StyleSheet } from 'react-native';
import Tabbar from '../../components/Tabbar';

const Home: React.FC = () => {
    return (
        <View style = {styles.body}>
            <Tabbar/>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    }
})

export default Home