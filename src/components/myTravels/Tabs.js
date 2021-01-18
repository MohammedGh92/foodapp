import React from 'react';
import I18n from 'react-native-i18n';
import {AppView} from '../../common';
import HeaderTab from '../HeaderTab';
const Tabs = () => {
  return (
    <AppView backgroundColor="white" stretch row spaceBetween>
      <HeaderTab title={I18n.t('join-requests')} value={1} />
      <HeaderTab title={I18n.t('joined-trips')} value={2} />
      <HeaderTab title={I18n.t('added-trips')} value={3} />
    </AppView>
  );
};

export default Tabs;
