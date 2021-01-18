import React, {useCallback, useMemo, useState} from 'react';
import {
  AppIcon,
  AppNavigation,
  AppText,
  AppView,
  getTheme,
  TouchableView,
} from '../../common';
import InputError from '../../common/micro/InputError';
import I18n from 'react-native-i18n';
import MapConfig from '../../utils/mapConfig';
const LocationInput = ({
  initialValue,
  error,
  isDirty,
  onChange,
  name,
  ...rest
}) => {
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
      <TouchableView
        row
        spaceBetween
        onPress={() =>
          AppNavigation.push({
            name: 'mapScreen',
            passProps: {
              onConfirm: setLocation,
            },
          })
        }
        stretch
        {...rest}>
        <AppView width={70}>
          <AppText size={4.7} marginHorizontal={2}>
            {address ? address : I18n.t('trip-start-place')}
          </AppText>
        </AppView>
        <AppView circleRadius={8} backgroundColor="foreground" center>
          <AppIcon
            name="ios-compass-outline"
            size={9}
            type="ion"
            color="white"
          />
        </AppView>
      </TouchableView>
      {showError && <InputError error={error} size={7} />}
    </>
  );
};

LocationInput.defaultProps = {
  ...getTheme().input,
};

export default LocationInput;
