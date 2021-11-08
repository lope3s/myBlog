import React from "react";
import { Text } from 'react-native';
import { View, MainContent, MainLogo, Button, Link, ErrrorMessage } from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as NewIcon from 'react-native-vector-icons/Feather';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import StyledInputBox from '../StyledInputBox'

interface ITest {
    navigation: any
}

const postForm = (data: any) => {
    console.log(data)
}

const Register: React.FC<ITest> = ({navigation}) => {
    const { values, handleSubmit, handleChange, errors, handleBlur, touched } = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Defina um nome de usuário'),
            email: Yup.string().email('Formato de e-mail inválido').required('Por favor, insira um e-mail'),
            password: Yup.string().min(6, 'Senha precisa ter ao menos 6 caracteres').required('Por favor, insira uma senha'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Senhas não batem').required('Por favor, confirme a senha')
        }),
        onSubmit: postForm
    })

    console.log(errors)

    return (
        <View>
            <MainContent>
                <MainLogo> Register </MainLogo>
                <StyledInputBox
                    width = "95%"
                    inputPlaceholder = "Username"
                    onChange={handleChange('username')}
                    value={values.username}
                    onBlur = {handleBlur('username')}
                >
                    <NewIcon.default
                        name = "user"
                        size = {25} 
                        color = "#fff"
                    />
                </StyledInputBox>
                {touched.username && errors.username && <ErrrorMessage> {errors.username} </ErrrorMessage>}
                <StyledInputBox
                    width = "95%"
                    inputPlaceholder = "E-mail"
                    onChange={handleChange('email')}
                    value={values.email}
                    onBlur = {handleBlur('email')}
                >
                    <Icon 

                        name = "email-outline"
                        size = {25}
                        color = "#fff"
                    />
                </StyledInputBox>
                {touched.email && errors.email && <ErrrorMessage> {errors.email} </ErrrorMessage>}
                <StyledInputBox
                    width = "95%"
                    inputPlaceholder = "Senha"
                    onChange={handleChange('password')}
                    value={values.password}
                    secureTextEntry = {true}
                    onBlur = {handleBlur('password')}
                >
                    <Icon 
                        name = "key-variant"
                        size = {25}
                        color = "#fff"
                    />
                </StyledInputBox>
                {touched.password && errors.password && <ErrrorMessage> {errors.password} </ErrrorMessage>}
                <StyledInputBox
                    width = "95%"
                    inputPlaceholder = "Confirme a senha"
                    onChange={handleChange('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry = {true}
                    onBlur = {handleBlur('confirmPassword')}
                >
                    <Icon 
                        name = "key-variant"
                        size = {25}
                        color = "#fff"
                    />
                </StyledInputBox>
                {touched.confirmPassword && errors.confirmPassword && <ErrrorMessage> {errors.confirmPassword} </ErrrorMessage>}
                <Button onPress = {handleSubmit}>
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