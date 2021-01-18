import React, { useEffect, useCallback } from 'react';
import { AppView, AppScrollView, AppImage, AppText, AppNavigation, AppForm } from '../../common';
import SplashScreen from 'react-native-splash-screen';
import { } from '../../components';
import Form from '../../components/signup/Form';
import { AuthValidation } from '../../validation';
import { AuthRepo } from '../../repo';
const authRepo = new AuthRepo();
const authValidation = new AuthValidation();

const SignUp = () => {

  useEffect(() => {
    SplashScreen.hide();
    console.log('useEffect Sign Up');
  }, []);

  const renderForm = useCallback(props => {
    return <Form {...props} onSkip={onSkip}/>;
  }, []);

  const onSubmit = useCallback(async (values, { setSubmitting }) => {
    await authRepo.registerData(values);
    setTimeout(() => {
      setSubmitting(false);
    }, 200);
  }, []);

  const onSkip = useCallback(async() => {
    let Samplevalues = { "username": "asdasd", "email":"sample@gmail.com" ,"mobile":"123456789",
"password": "123123","lang":"en" };
    await authRepo.registerData(Samplevalues);
  }, []);

  return (
    <AppView flex centerX backgroundColor='#ECECEC'>
      <AppImage center resizeMode="contain" marginTop={30} height={10} width={70}
        source={require('../../assets/imgs/ofertaLogo.png')}></AppImage>
      <AppText size={10} color='darkgrey'>Create new account</AppText>
      <AppForm
        validationSchema={authValidation.signUp}
        schema={{
          username: 'asdasd',
          email: 'sample@gmail.com',
          mobile: '123456789',
          password: '123123'
        }}
        render={renderForm}
        {...{ onSubmit }}
      />
    </AppView>
  );
};

export default SignUp;