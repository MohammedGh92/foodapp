import React from 'react';
import {APP_BASE_URL} from '../../api/utils/urls';
import {AppImage, AppNavigation, AppText, AppView} from '../../common';
import I18n from 'react-native-i18n';
import AcceptRefuseTripBtns from '../AcceptRefuseTripBtns';
const DriversRequestsCard = ({
  trip_date,
  created_at,
  event_name,
  participant,
  trip_id,
}) => {
  return (
    <AppView stretch margin={8}>
      <AppView stretch row>
        <AppImage
          onPress={() => {
            AppNavigation.push({
              name: 'userProfile',
              passProps: {
                user: participant,
              },
            });
          }}
          source={{uri: `${APP_BASE_URL}${participant.image}`}}
          equalSize={15}
          borderRadius={5}
          backgroundColor="red"
        />
        <AppView stretch marginHorizontal={2}>
          {trip_id && (
            <AppText marginTop={5} color="secondary" size={6}>{`${I18n.t(
              'trip-num',
            )}:${trip_id}`}</AppText>
          )}
          <AppText size={7} color="secondary">
            {participant.name}
          </AppText>
          <AppView width={70}>
            <AppText size={6} numberOfLines={2}>{`${I18n.t(
              'want-to-join',
            )} (${event_name})، ${I18n.t('trip-date')} ${trip_date}`}</AppText>
          </AppView>
          <AppText color="foreground">{created_at}</AppText>
        </AppView>
      </AppView>
      <AcceptRefuseTripBtns user_id={participant.id} {...{trip_id}} />
    </AppView>
  );
};

export default DriversRequestsCard;
