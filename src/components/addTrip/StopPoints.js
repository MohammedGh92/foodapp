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

const Point = ({title, onPressRemove}) => {
  return (
    <AppView marginVertical={5} stretch spaceBetween row>
      <AppView
        equalSize={6}
        borderWidth={1}
        br
        backgroundColor="#F5F5F5"
        borderColor="#E7E7E7"
      />
      <AppView width={70}>
        <AppText color="black" marginHorizontal={5}>
          {title}
        </AppText>
      </AppView>
      <TouchableView onPress={onPressRemove}>
        <AppIcon
          name="squared-minus"
          type="entypo"
          color="secondary"
          size={12}
        />
      </TouchableView>
    </AppView>
  );
};
const StopPoints = ({
  initialValue,
  error,
  isDirty,
  onChange,
  name,
  ...rest
}) => {
  const [addresses, setAddresses] = useState(initialValue || []);

  const showError = useMemo(() => error && isDirty, [error, isDirty]);

  const setLocation = useCallback(
    async (loc) => {
      let addrName = '';
      try {
        addrName = await MapConfig.getPlaceName(loc.latitude, loc.longitude);
      } catch {
        addrName = 'place name';
      }
      const address = {
        name: addrName,
        latitude: loc.latitude,
        longitude: loc.longitude,
      };
      const newAddresses = [...addresses, address];
      setAddresses(newAddresses);
      if (onChange) {
        onChange(name, newAddresses);
      }
    },
    [name, addresses, onChange],
  );
  const onPressRemove = useCallback(
    (index) => {
      console.log(addresses, 'old');
      let newArr = [...addresses];
      newArr.splice(index, 1);
      console.log(newArr, 'new');
      setAddresses(newArr);
      if (onChange) {
        onChange(name, newArr);
      }
    },
    [addresses, onChange, name],
  );
  return (
    <AppView stretch>
      <AppView stretch row>
        <AppText size={6} color="secondary">
          {I18n.t('stop-points')}
        </AppText>
        {addresses.length < 5 && (
          <TouchableView
            marginHorizontal={5}
            onPress={() =>
              AppNavigation.push({
                name: 'mapScreen',
                passProps: {
                  onConfirm: setLocation,
                },
              })
            }
            circleRadius={8}
            backgroundColor="foreground"
            center>
            <AppIcon name="plus" type="oct" color="white" size={12} />
          </TouchableView>
        )}
      </AppView>
      {addresses.map((item, index) => (
        <Point
          key={index}
          title={item.name}
          onPressRemove={() => onPressRemove(index)}
        />
      ))}

      {showError && <InputError error={error} size={7} />}
    </AppView>
  );
};

export default StopPoints;
