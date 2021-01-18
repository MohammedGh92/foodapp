import React, { useEffect, useCallback } from 'react';
import { AppView, AppScrollView, AppImage, AppText, AppNavigation, AppForm } from '../../common';
import SplashScreen from 'react-native-splash-screen';
import { } from '../../components';
import Form from '../../components/signin/Form';
import { AuthValidation } from '../../validation';
import { AuthRepo } from '../../repo';
const authRepo = new AuthRepo();
const authValidation = new AuthValidation();

const SignIn = () => {

  useEffect(() => {
    SplashScreen.hide();
    console.log('useEffect Sign in');
  }, []);

  const renderForm = useCallback(props => {
    return <Form {...props} onSkip={onSkip} />;
  }, []);

  const onSubmit = useCallback(async (values, { setSubmitting }) => {
    console.log('values:' + JSON.stringify(values));
    await authRepo.signIn(values);
    setTimeout(() => {
      setSubmitting(false);
    }, 200);

  }, []);

  const onSkip = useCallback(async() => {
    let Samplevalues = { "username": "asdasd", "password": "123123"};
    await authRepo.signIn(Samplevalues);
  }, []);

  return (
    <AppView flex centerX backgroundColor='#ECECEC'>
      <AppImage center resizeMode="contain" marginTop={30} height={10} width={70}
        source={require('../../assets/imgs/ofertaLogo.png')}></AppImage>
      <AppText size={10} color='darkgrey'>Sign in</AppText>
      <AppForm
        validationSchema={authValidation.signIn}
        schema={{
          username: 'asdasd',
          password: '123123',
        }}
        render={renderForm}
        {...{ onSubmit }}
      />
    </AppView>
  );
};

export default SignIn;