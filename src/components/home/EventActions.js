import React, {useCallback} from 'react';
import {AppNavigation, AppView} from '../../common';
import ActionItem from './ActionItem';
import I18n from 'react-native-i18n';
import {EventsRepo} from '../../repo';
import JoinTrip from './JoinTrip';
import JoinEvent from './JoinEvent';
const eventsRepo = new EventsRepo();
const EventActions = ({event_country, event_id}) => {
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
  return (
    <AppView paddingVertical={5} stretch row spaceAround>
      <ActionItem
        onPress={pushAddTrip}
        name="plus-square"
        type="feather"
        title={I18n.t('create-trip')}
      />
      <JoinTrip />
      <JoinEvent {...{eventsRepo}} />
    </AppView>
  );
};

export default EventActions;
