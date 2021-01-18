import React, { useState, useEffect, useCallback } from 'react';
import Picker from '../Picker';
import I18n from 'react-native-i18n';
import { AppView, AppText } from '../../common';

const TypesPicker = ({ setFieldValue, injectFormProps }) => {
  
  const data = [
    {name: I18n.t('order'), id: 0},
    {name: I18n.t('compliant'), id: 1},
    {name: I18n.t('suggest'), id: 2},
    {name: I18n.t('other'), id: 3},
  ];

  return (
    <AppView stretch marginVertical={3}>
      <Picker
        label="name"
        value="id"
        data={data}
        title={I18n.t('contact-goal')}
        {...{ setFieldValue }}
        {...injectFormProps('type')}
      />
    </AppView>
  );
};

export default TypesPicker;
