import React, {useCallback, useState} from 'react';
import {AppView} from '../../common';
import {LoadingPicker} from '..';
import I18n from 'react-native-i18n';
const LocationPickers = ({
  setFieldValue,
  event_country,
  pickersRepo,
  injectFormProps,
}) => {
  const [selectedState, setSelectedState] = useState(null);
  const onSetSelectedState = useCallback(
    (name, value) => {
      setFieldValue(name, value);
      setSelectedState(value);
    },
    [setFieldValue],
  );
  return (
    <AppView stretch>
      <LoadingPicker
        param={event_country}
        provider={pickersRepo.getStates}
        title={I18n.t('state')}
        setFieldValue={onSetSelectedState}
        {...injectFormProps('state_id')}
      />
      <LoadingPicker
        param={selectedState}
        provider={pickersRepo.getCitites}
        title={I18n.t('city')}
        {...{setFieldValue}}
        {...injectFormProps('city_id')}
      />
    </AppView>
  );
};

export default LocationPickers;
