import React, { useState } from 'react';
import {
  AppView,
  AppText,
  AppButton,
  AppSpinner,
  AppIcon,
  AppNavigation,
} from '../../common';
import Field from '../Field';
import TouchableView from '../../common/TouchableAniamtedView';

const Form = ({ injectFormProps, isSubmitting, handleSubmit,onSkip }) => {
  const [istermsAccepted, setIsTermsAccepted] = useState(false);

  return (
    <AppView width={90} marginTop={50} centerX paddingBottom={5}>
      <Field
        elevation={0}
        {...injectFormProps('username')}
        placeholder={'user name'}
        leftItems={
          <AppIcon name="user" type="ant" color="darkgrey" marginLeft={5} />
        }
      />
      <Field
        {...injectFormProps('password')}
        elevation={0}
        placeholder={'password'}
        secure={true}
        showSecureEye
        leftItems={
          <AppIcon name="lock" type="evil" color="darkgrey" marginLeft={5} />
        }
      />

      <AppButton
        onPress={() => {
          if (!isSubmitting) {
            handleSubmit();
          }
        }}
        stretch
        backgroundColor='#4ED7C8'
        marginTop={10}
        height={7}
        borderRadius={50}
        processing={isSubmitting}>
        {isSubmitting ? (
          <AppSpinner color="#616161" />
        ) : (
            <AppText color="#616161" size={7}>
              {'Sign in'}
            </AppText>
          )}
      </AppButton>

      <AppButton
        onPress={() => {
          if (!isSubmitting) {
            AppNavigation.navigateToRegister();
          }
        }}
        stretch
        backgroundColor='transparent'
        borderWidth={1}
        marginTop={10}
        height={7}
        borderRadius={50}
      >
        <AppText color="#616161" size={7}>
          {'Create new account'}
        </AppText>
      </AppButton>

      <AppView row spaceBetween marginTop={30} width={80} height={5}>

        <AppText color="#616161" size={7}  onPress={() => {
          if (!isSubmitting) {
            onSkip();
          }
        }}>
          {'Skip'}
        </AppText>

        <AppText color="#616161" size={7}>
          {'Forget Password?'}
        </AppText>

      </AppView>

    </AppView>
  );
};

export default Form;
