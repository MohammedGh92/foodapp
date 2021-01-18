import React, {useMemo} from 'react';
import {AppText, AppView} from '../../common';
import I18n from 'react-native-i18n';
const NotificationInfo = ({message, trip_id, created_at}) => {
  // const userName = useMemo(() => {
  //   return message.s
  // }, []);
  return (
    <AppView stretch marginHorizontal={5} width={55}>
      {trip_id && (
        <AppText marginTop={5} color="secondary" size={6}>{`${I18n.t(
          'trip-num',
        )}:${trip_id}`}</AppText>
      )}
      <AppText marginBottom={1}>{message}</AppText>
      <AppText color="#6ECBF2">{created_at}</AppText>
    </AppView>
  );
};

export default NotificationInfo;
