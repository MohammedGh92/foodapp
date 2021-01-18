import React, {useState, useCallback, useEffect, useMemo} from 'react';

import {AppView, AppText, TouchableView, AppNavigation} from '../../common';
import I18n from 'react-native-i18n';
import MapConfig from '../../utils/mapConfig';
import InputError from '../../common/micro/InputError';
const EventPlace = ({initialValue, error, isDirty, onChange, name}) => {
  const [address, setAddress] = useState(
    initialValue
      ? {
          latitude: initialValue[0],
          longitude: initialValue[1],
        }
      : null,
  );

  const showError = useMemo(() => error && isDirty, [error, isDirty]);

  const setLocation = useCallback(
    async (loc) => {
      let addr = '';
      try {
        addr = await MapConfig.getPlaceName(loc.latitude, loc.longitude);
      } catch {
        addr = 'place name';
      }
      setAddress(addr);
      if (onChange) {
        onChange(name, [loc.latitude, loc.longitude]);
      }
    },
    [name, onChange],
  );
  return (
    <>
      <AppView stretch row spaceBetween>
        <AppView width={45} stretch row>
          <AppView
            circleRadius={6}
            borderColor="primary"
            center
            borderWidth={1}>
            <AppView circleRadius={4} backgroundColor="primary" />
          </AppView>
          <AppText size={4.7} marginHorizontal={2}>
            {address ? address : I18n.t('event-place')}
          </AppText>
        </AppView>

        <TouchableView
          center
          borderRadius={5}
          backgroundColor="primary"
          onPress={() =>
            AppNavigation.push({
              name: 'mapScreen',
              passProps: {
                onConfirm: setLocation,
              },
            })
          }
          padding={3}>
          <AppText color="white">{I18n.t('add-place')}</AppText>
        </TouchableView>
      </AppView>
      {showError && <InputError error={error} size={7} />}
    </>
  );
};

export default EventPlace;
