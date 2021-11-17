import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { Container } from './style';

export const Loading: React.FC = () => {
    return(
        <Container>
            <ActivityIndicator size={100} color="#E9A6A6"/>
            <Text style={{color: "#fff", fontSize: 15}}>Loading...</Text>
        </Container>
    )
}