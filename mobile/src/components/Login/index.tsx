import React from "react";
import { Text } from 'react-native';
import { View, MainContent, MainLogo, Button, Link } from './style';
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

                <Button>
                    <Text style = {{color: "#fff", fontSize: 18}}> Login </Text>
                </Button>
                <Link onPress = {() => navigation.navigate('Register')}>
                    <Text style = {{color: "#E9A6A6", fontSize: 15}}> Resgistrar </Text>
                </Link>
            </MainContent>
        </View>
    )
}

export default Login