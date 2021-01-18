import React, {useCallback} from 'react';
import {
  AppIcon,
  AppNavigation,
  AppText,
  AppView,
  TouchableView,
} from '../../common';

const Location = ({cityName, address, latitude, longitude}) => {
  const pushMap = useCallback(() => {
    AppNavigation.push({
      name: 'mapScreen',
      passProps: {
        hideConfirm: true,
        initialLocation: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
      },
    });
  }, [latitude, longitude]);

  return (
    <AppView marginVertical={5} stretch row spaceBetween>
      <AppView>
        <AppView row>
          <AppIcon
            name="location-sharp"
            type="ion"
            size={8}
            color="secondary"
          />
          {cityName && (
            <AppText size={7} marginHorizontal={2} color="secondary">
              {cityName}
            </AppText>
          )}
        </AppView>
        <AppView width={70}>
          <AppText size={6}>{address}</AppText>
        </AppView>
      </AppView>

      <TouchableView
        onPress={pushMap}
        circleRadius={10}
        center
        backgroundColor="foreground">
        <AppIcon
          size={10}
          name="ios-paper-plane-outline"
          type="ion"
          color="white"
        />
      </TouchableView>
    </AppView>
  );
};

export default Location;
