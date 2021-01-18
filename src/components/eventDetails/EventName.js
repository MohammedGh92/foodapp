import React, {useMemo} from 'react';
import {AppText, AppView} from '../../common';
import I18n from 'react-native-i18n';
import EventItem from '../EventItem';

const EventName = ({
  name,
  appointments,
  appointment_type,
  targetGroups,
  eventTypes,
}) => {
  const types = useMemo(() => eventTypes.map((item) => item.name).toString(), [
    eventTypes,
  ]);

  const groups = useMemo(
    () => targetGroups.map((item) => item.name).toString(),
    [targetGroups],
  );

  return (
    <AppView stretch>
      <AppText size={7} marginVertical={5} color="secondary">
        {name}
      </AppText>

      {appointment_type === 'time_period' ? (
        <EventItem
          name="calendar"
          type="foundation"
          value={`${I18n.t('from')} ${appointments[0].datetime} ${I18n.t(
            'to',
          )} ${appointments[1].datetime}`}
        />
      ) : (
        appointments.map((item) => (
          <EventItem name="calendar" type="foundation" value={item.datetime} />
        ))
      )}
      <EventItem name="handshake" type="material-community" value={types} />
      <EventItem
        name="car-hatchback"
        type="material-community"
        value={groups}
      />
    </AppView>
  );
};

export default EventName;
