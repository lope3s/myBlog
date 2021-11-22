import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home: React.FC = () => {
    return (
        <View style = {styles.body}>
            <Text style = {styles.text}>
                Olá minha bela esposinha, um belo dia para você
                PS: quer me dar?
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        width: "90%",
        textAlign: 'center'
    }
})

export default Home