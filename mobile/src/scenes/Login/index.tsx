import React, {useState} from 'react';
import {Text} from 'react-native';
import {View, MainContent, MainLogo, Link, ErrorMessage} from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SeccondIcon from 'react-native-vector-icons/Entypo';
import {InformationModal} from '../../components/informationModal';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import useNextInput from '../../Hooks/InputHook';
import {useMutation} from '@apollo/client';
import {LOGIN_QUERY} from '../../GraphQueries/loginQueries';
import {Loading} from '../../components/LoadingComponent';
import loginError from '../../Services/GraphErrorHandling/loginError';
import {useStoreActions} from 'easy-peasy';
import {IMainModel} from '../../Types';
import {decode} from 'react-native-pure-jwt';
import {setItem} from '../../Services/AsyncStorageServices';
import {Button} from '../../components/Button';

import StyledInputBox from '../../components/StyledInputBox';

interface ITest {
  navigation: any;
  route: any;
}

const Login: React.FC<ITest> = ({route, navigation}) => {
  const [messageDisplayed, setMessageDisplayed] = useState(false);
  const [serverError, setServerError] = useState('');
  const updateUser = useStoreActions<IMainModel>(
    actions => actions.userModel.updateUser,
  );
  const [login, {data, loading, error}] = useMutation(LOGIN_QUERY);
  const postForm = (values: any) => {
    setServerError('');
    login({variables: values});
  };
  const {addInput, focusNextField} = useNextInput();
  const {handleSubmit, values, handleChange, handleBlur, touched, errors} =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email('Formato de e-mail inválido')
          .required('Por favor, insira um e-mail'),
        password: Yup.string()
          .min(6, 'Senha precisa ter ao menos 6 caracteres')
          .required('Por favor, insira uma senha'),
      }),
      onSubmit: postForm,
    });

  if (error) {
    loginError(error, serverError, setServerError);
  }

  if (data) {
    setItem('token', data.login.token);
    setItem('refreshToken', data.login.refreshToken);
    decode(data.login.token, 'usoppn').then(res => {
      const {exp, iat, ...userData} = res.payload as any;
      updateUser(userData);
    });
  }

  const displayMessage = () => {
    setTimeout(() => {
      setMessageDisplayed(true);
    }, 3500);

    return (
      <InformationModal text={route.params?.data}>
        <SeccondIcon name="check" size={25} color="#0f0" />
      </InformationModal>
    );
  };

  return (
    <View>
      {loading && <Loading />}
      <MainContent>
        <MainLogo> myBlog </MainLogo>
        <StyledInputBox
          returnKeyType="next"
          width="95%"
          inputPlaceholder="e-mail"
          value={values.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          onSubmitEditing={() => {
            focusNextField(0);
          }}
          blurOnSubmit={false}>
          <Icon name="email-outline" size={25} color="#fff" />
        </StyledInputBox>
        {touched.email && errors.email && (
          <ErrorMessage> {errors.email} </ErrorMessage>
        )}
        <StyledInputBox
          returnKeyType="go"
          width="95%"
          inputPlaceholder="senha"
          value={values.password}
          onChange={handleChange('password')}
          secureTextEntry={true}
          refs={addInput}
          onSubmitEditing={handleSubmit}
          onBlur={handleBlur('password')}>
          <Icon name="key-variant" size={25} color="#fff" />
        </StyledInputBox>
        {touched.password && errors.password && (
          <ErrorMessage> {errors.password} </ErrorMessage>
        )}
        <Button onPress={handleSubmit} text="Login" />
        {serverError.length > 0 && <ErrorMessage> {serverError} </ErrorMessage>}
        <Link onPress={() => navigation.navigate('Register')}>
          <Text style={{color: '#E9A6A6', fontSize: 15}}> Resgistrar </Text>
        </Link>
      </MainContent>
      {route.params?.data && !messageDisplayed && displayMessage()}
    </View>
  );
};

export default Login;
