import React, { useState } from "react";
import { Text } from 'react-native';
import { View, MainContent, MainLogo, Button, Link, ErrorMessage } from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as NewIcon from 'react-native-vector-icons/Feather';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { Loading } from '../LoadingComponent/index';
import useNextInput from "../../Hooks/InputHook";

import StyledInputBox from '../StyledInputBox';

interface ITest {
    navigation: any
}

const Register: React.FC<ITest> = ({navigation}) => {
    const { focusNextField, addInput } = useNextInput()
    const [mutateFunction, {data, loading, error}] = useMutation(gql`
    mutation RegisterMutation($userName: String!, $email: String!, $password: String!) {
        register (userName: $userName, email: $email, password: $password){
          message
        }
      }
    `)
    const [serverError, setServerError] = useState({userName: '', email: '', touched: false})

    const postForm = (values: any) => {
        if (!serverError.userName && !serverError.email){
            const { confirmPassword, ...rest } = values
    
            mutateFunction({ variables: {...rest}})
            setServerError({...serverError, touched: false})
        }
    }

    const { values, handleSubmit, handleChange, errors, handleBlur, touched } = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            userName: Yup.string().required('Defina um nome de usuário'),
            email: Yup.string().email('Formato de e-mail inválido').required('Por favor, insira um e-mail'),
            password: Yup.string().min(6, 'Senha precisa ter ao menos 6 caracteres').required('Por favor, insira uma senha'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Senhas não batem').required('Por favor, confirme a senha')
        }),
        onSubmit: postForm
    })

    if (error?.graphQLErrors[0] && !serverError.touched){
        const err = error?.graphQLErrors[0] as any
        const errValues = err.extensions.response.body.message

        const obj = {userName: '', email: ''} as any

        errValues.forEach((string: string) => {
            const splitedValues = string.split(':')
            obj[splitedValues[0]] =  splitedValues[1]
        })

        setServerError({...obj, touched: true})
    }

    if (data){
        navigation.navigate('Login', {data: data.register.message})
    }

    return (
        <View>
            {
                loading && <Loading/>
            }
            <MainContent>
                <MainLogo> Register </MainLogo>
                <StyledInputBox
                    returnKeyType="next"
                    width = "95%"
                    inputPlaceholder = "Username"
                    onChange={handleChange('userName')}
                    value={values.userName}
                    onBlur = {handleBlur('userName')}
                    onFocus={() => setServerError({...serverError, userName: ''})}
                    onSubmitEditing={() => {
                        focusNextField(2)
                    }}
                    blurOnSubmit={false}
                >
                    <NewIcon.default
                        name = "user"
                        size = {25} 
                        color = "#fff"
                    />
                </StyledInputBox>
                {touched.userName && errors.userName ? <ErrorMessage> {errors.userName} </ErrorMessage> : serverError.userName.length > 0 && <ErrorMessage>{serverError.userName}</ErrorMessage>}
                <StyledInputBox
                    returnKeyType="next"
                    width = "95%"
                    inputPlaceholder = "E-mail"
                    onChange={handleChange('email')}
                    value={values.email}
                    onBlur = {handleBlur('email')}
                    onFocus={() => setServerError({...serverError, email: ''})}
                    refs={addInput}
                    onSubmitEditing={() => {
                        focusNextField(1)
                    }}
                    blurOnSubmit={false}
                >
                    <Icon 

                        name = "email-outline"
                        size = {25}
                        color = "#fff"
                    />
                </StyledInputBox>
                {touched.email && errors.email ? <ErrorMessage> {errors.email} </ErrorMessage> : serverError.email.length > 0 && <ErrorMessage>{serverError.email}</ErrorMessage>}
                <StyledInputBox
                    returnKeyType="next"
                    width = "95%"
                    inputPlaceholder = "Senha"
                    onChange={handleChange('password')}
                    value={values.password}
                    secureTextEntry = {true}
                    onBlur = {handleBlur('password')}
                    refs={addInput}
                    onSubmitEditing={() => {
                        focusNextField(0)
                    }}
                    blurOnSubmit={false}
                >
                    <Icon 
                        name = "key-variant"
                        size = {25}
                        color = "#fff"
                    />
                </StyledInputBox>
                {touched.password && errors.password && <ErrorMessage> {errors.password} </ErrorMessage>}
                <StyledInputBox
                    returnKeyType="go"
                    width = "95%"
                    inputPlaceholder = "Confirme a senha"
                    onChange={handleChange('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry = {true}
                    onBlur = {handleBlur('confirmPassword')}
                    refs={addInput}
                    onSubmitEditing={handleSubmit}
                >
                    <Icon 
                        name = "key-variant"
                        size = {25}
                        color = "#fff"
                    />
                </StyledInputBox>
                {touched.confirmPassword && errors.confirmPassword && <ErrorMessage> {errors.confirmPassword} </ErrorMessage>}
                <Button onPress = {handleSubmit}>
                    <Text style = {{color: "#fff", fontSize: 18}}> Registrar </Text>
                </Button>
                {
                    error &&
                    error.networkError &&
                    <ErrorMessage> Sem acesso à internet </ErrorMessage>
                }
                <Link onPress = {() => navigation.navigate('Login')}>
                    <Text style = {{color: "#E9A6A6", fontSize: 15}}> Voltar ao Login </Text>
                </Link>
            </MainContent>
        </View>
    )
}

export default Register