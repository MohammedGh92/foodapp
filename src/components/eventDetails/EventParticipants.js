import React, {useMemo} from 'react';
import {
  AppButton,
  AppImage,
  AppNavigation,
  AppText,
  AppView,
  TouchableView,
} from '../../common';
import I18n from 'react-native-i18n';
import {APP_BASE_URL} from '../../api/utils/urls';
const EventParticipants = ({participants, onJoin, event_id}) => {
  const allpartcpnts = useMemo(
    () => [...participants.friends, ...participants.others],
    [participants],
  );
  const users = allpartcpnts.slice(0, 3);
  const isPlusViewVisible = useMemo(() => {
    return allpartcpnts.length - users.length > 0;
  }, [allpartcpnts, users]);
  return (
    <AppView stretch>
      <AppText marginVertical={5} color="secondary" size={7}>
        {I18n.t('event-participants')}
      </AppText>
      <AppView stretch row>
        <AppText size={6}>{`${I18n.t('number-of-participants')} ${
          allpartcpnts.length > 50 ? '+50' : allpartcpnts.length
        } ${I18n.t('you-can-see-all-participant')}`}</AppText>
      </AppView>
      <TouchableView
        onPress={() =>
          AppNavigation.push({
            name: 'participants',
            passProps: {
              partcpants: participants,
              event_id,
              onJoin,
            },
          })
        }
        row
        stretch
        marginVertical={5}>
        {users.map((participant) => (
          <AppImage
            elevation={2}
            key={participant.id}
            circleRadius={13}
            marginLeft={2}
            source={{uri: `${APP_BASE_URL}${participant.image}`}}
          />
        ))}
        {isPlusViewVisible && (
          <AppView backgroundColor="#29235C" circleRadius={15} center>
            <AppText color="white">
              +{allpartcpnts.length - users.length}
            </AppText>
          </AppView>
        )}
      </TouchableView>
      <AppButton
        onPress={() =>
          AppNavigation.push({
            name: 'posts',
            passProps: {event_id},
          })
        }
        stretch
        title={I18n.t('see-posts')}
        elevation={1}
        marginVertical={10}
        color="secondary"
        backgroundColor="white"
      />
    </AppView>
  );
};

export default EventParticipants;
