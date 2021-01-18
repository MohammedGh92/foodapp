import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {AppButton, AppNavigation, AppView} from '../../common';
import I18n from 'react-native-i18n';
const FlightContainer = ({event_id, event_country}) => {
  const pushAddTrip = useCallback(
    () =>
      AppNavigation.push({
        name: 'addTrip',
        passProps: {
          event_id,
          event_country,
        },
      }),
    [event_country, event_id],
  );

  const pushTrips = useCallback(
    () =>
      AppNavigation.push({
        name: 'eventTrips',
        passProps: {
          event_id,
        },
      }),
    [event_id],
  );

  return (
    <AppView
      row
      center
      spaceAround
      backgroundColor="#908F9B1A"
      style={styles.flightContainer}
      height={15}
      borderTopLeftRadius={20}
      borderTopRightRadius={20}>
      <AppButton
        title={I18n.t('available-trips')}
        width={38}
        onPress={pushTrips}
      />
      <AppButton
        onPress={pushAddTrip}
        title={I18n.t('create-trip')}
        backgroundColor="white"
        color="secondary"
        width={38}
      />
    </AppView>
  );
};

const styles = StyleSheet.create({
  flightContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default FlightContainer;
