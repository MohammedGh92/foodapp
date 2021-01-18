import React from 'react';
import {AppView, AppText} from '../common';
import I18n from 'react-native-i18n';
const RegisterWelcome = () => {
  return (
    <AppView>
      <AppText color="secondary" bold size={20}>
        {I18n.t('matjar')}
      </AppText>
      <AppText color="white" size={15} bold>
        {I18n.t('welcome-with-us')}
      </AppText>
    </AppView>
  );
};

export default RegisterWelcome;
