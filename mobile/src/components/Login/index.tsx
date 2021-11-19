import React from "react";
import { Text } from 'react-native';
import { View, MainContent, MainLogo, Button, Link, ErrorMessage } from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SeccondIcon from 'react-native-vector-icons/Entypo';
import { InformationModal } from "../informationModal";
import { useFormik } from "formik";
import * as Yup from 'yup';
import useNextInput from "../../Hooks/InputHook";

import StyledInputBox from '../StyledInputBox'

interface ITest {
    navigation: any
    route: any
}

const postForm = (data: any) => {
    console.log(data)
}

const Login: React.FC<ITest> = ({route, navigation}) => {  
    const { addInput, focusNextField } = useNextInput()
    const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Formato de e-mail inválido').required('Por favor, insira um e-mail'),
            password: Yup.string().min(6, 'Senha precisa ter ao menos 6 caracteres').required('Por favor, insira uma senha')
        }),
        onSubmit: postForm
    }) 

    return (
        <View>
            <MainContent>
                <MainLogo> myBlog </MainLogo>
                <StyledInputBox
                    returnKeyType = "next"
                    width = "95%"
                    inputPlaceholder = "e-mail"
                    value={values.email}
                    onChange={handleChange('email')}
                    onBlur = {handleBlur('email')}
                    onSubmitEditing={() => {
                        focusNextField(0)
                    }}
                    blurOnSubmit={false}
                >
                    <Icon 
                        name = "email-outline"
                        size = {25}
                        color = "#fff"
                    />
                </StyledInputBox>
                {touched.email && errors.email && <ErrorMessage> {errors.email} </ErrorMessage>}
                <StyledInputBox
                    returnKeyType="go"
                    width = "95%"
                    inputPlaceholder = "senha"
                    value={values.password}
                    onChange={handleChange('password')}
                    secureTextEntry={true}
                    refs = {addInput}
                    onSubmitEditing={handleSubmit}
                    onBlur={handleBlur('password')}
                >
                    <Icon 
                        name = "key-variant"
                        size = {25}
                        color = "#fff"
                    />
                </StyledInputBox>
                {touched.password && errors.password && <ErrorMessage> {errors.password} </ErrorMessage>}
                <Button onPress = {handleSubmit}>
                    <Text style = {{color: "#fff", fontSize: 18}}> Login </Text>
                </Button>
                <Link onPress = {() => navigation.navigate('Register')}>
                    <Text style = {{color: "#E9A6A6", fontSize: 15}}> Resgistrar </Text>
                </Link>
            </MainContent>
            {
                route.params?.data && <InformationModal text = {route.params?.data}>
                    <SeccondIcon
                        name = "check"
                        size = {25}
                        color = "#0f0"
                    />
                </InformationModal>
            }
        </View>
    )
}

export default Login