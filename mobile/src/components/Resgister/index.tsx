import React from "react";
import { Text } from 'react-native';
import { View, MainContent, MainLogo, Button, Link } from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as NewIcon from 'react-native-vector-icons/Feather';

import StyledInputBox from '../StyledInputBox'

interface ITest {
    navigation: any
}

const Register: React.FC<ITest> = ({navigation}) => {
    return (
        <View>
            <MainContent>
                <MainLogo> Register </MainLogo>
                <StyledInputBox
                    width = "95%"
                    inputPlaceholder = "E-mail"
                >
                    <NewIcon.default
                        name = "user"
                        size = {25} 
                        color = "#fff"
                    />
                </StyledInputBox>
                <StyledInputBox
                    width = "95%"
                    inputPlaceholder = "E-mail"
                >
                    <Icon 

                        name = "email-outline"
                        size = {25}
                        color = "#fff"
                    />
                </StyledInputBox>
                <StyledInputBox
                    width = "95%"
                    inputPlaceholder = "Senha"
                >
                    <Icon 
                        name = "key-variant"
                        size = {25}
                        color = "#fff"
                    />
                </StyledInputBox>
                <StyledInputBox
                    width = "95%"
                    inputPlaceholder = "Confirme a senha"
                >
                    <Icon 
                        name = "key-variant"
                        size = {25}
                        color = "#fff"
                    />
                </StyledInputBox>
                <Button>
                    <Text style = {{color: "#fff", fontSize: 18}}> Registrar </Text>
                </Button>
                <Link onPress = {() => navigation.navigate('Login')}>
                    <Text style = {{color: "#E9A6A6", fontSize: 15}}> Voltar ao Login </Text>
                </Link>
            </MainContent>
        </View>
    )
}

export default Register