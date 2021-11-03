import React from "react";
import { Text } from 'react-native';
import { View, MainContent, MainLogo, Button } from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import StyledInputBox from '../StyledInputBox'

interface ITest {
    navigation: any
}

const Login: React.FC<ITest> = ({navigation}) => {
    return (
        <View>
            <MainContent>
                <MainLogo> myBlog </MainLogo>
                <StyledInputBox
                    width = "95%"
                    inputPlaceholder = "e-mail"
                >
                    <Icon 
                        name = "email-outline"
                        size = {25}
                        color = "#fff"
                    />
                </StyledInputBox>
                <StyledInputBox
                    width = "95%"
                    inputPlaceholder = "senha"
                >
                    <Icon 
                        name = "key-variant"
                        size = {25}
                        color = "#fff"
                    />
                </StyledInputBox>

                <Button onPress = {() => navigation.navigate('Profile')}>
                    <Text style = {{color: "#fff", fontSize: 18}}> Login </Text>
                </Button>
            </MainContent>
        </View>
    )
}

export default Login