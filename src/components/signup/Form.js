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

const Form = ({ injectFormProps, isSubmitting, handleSubmit,onSkip }) => {
  const [istermsAccepted, setIsTermsAccepted] = useState(false);

  return (
    <AppView width={90} marginTop={25} centerX paddingBottom={5}>
      <Field
        elevation={0}
        {...injectFormProps('username')}
        placeholder={'user name'}
        leftItems={
          <AppIcon name="user" type="ant" color="darkgrey" marginLeft={5} />
        }
      />
      <Field
        {...injectFormProps('email')}
        elevation={0}
        placeholder={'email'}
        leftItems={
          <AppIcon name="email" type="fontisto" color="darkgrey" marginLeft={5} />
        }
      />

      <Field
        {...injectFormProps('mobile')}
        elevation={0}
        placeholder={'mobile'}
        leftItems={
          <AppIcon name="mobile1" type="ant" color="darkgrey" marginLeft={5} />
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
              {'Confirm'}
            </AppText>
          )}
      </AppButton>

      <AppButton
        onPress={() => {
          if (!isSubmitting) {
            AppNavigation.navigateToAuth();
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
          {'Have an Account Already?'}
        </AppText>
      </AppButton>

      <AppView row spaceBetween marginTop={10} width={80} height={5}>

        <AppText color="#616161" size={7} onPress={() => {
          if (!isSubmitting) {
            onSkip();
          }
        }}>
          {'Skip'}
        </AppText>
      </AppView>


    </AppView>
  );
};

export default Form;
