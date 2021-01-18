import React, {useCallback, useState} from 'react';
import {
  AppImage,
  AppNavigation,
  AppText,
  AppView,
  TouchableView,
} from '../../common';
import I18n from 'react-native-i18n';
import NotificationInfo from './NotificationInfo';
import {APP_BASE_URL} from '../../api/utils/urls';
import {NotificationsRepo} from '../../repo';
import {navigateToNotificationDetails} from '../../utils/notificationHelper';
const notificationsRepo = new NotificationsRepo();
const NotificationCard = ({
  image,
  is_redirect,
  id: notifId,
  read_at,
  created_at,
  message,
  type,
  event_id,
  trip_id,
}) => {
  const [isRead, setIsRead] = useState(read_at !== null);
  const onPressNotifications = useCallback(() => {
    if (!isRead) {
      const res = notificationsRepo.readNotif(notifId);
      if (res) {
        setIsRead(true);
      }
    }
    if (is_redirect) {
      navigateToNotificationDetails(type, event_id || trip_id);
    }
  }, [notifId, isRead, trip_id, event_id, type, is_redirect]);
  return (
    <TouchableView
      padding={5}
      stretch
      marginHorizontal={5}
      marginBottom={5}
      row
      spaceBetween
      onPress={onPressNotifications}>
      <AppView stretch row spaceBetween>
        <AppImage
          elevation={2}
          backgroundColor="#fff"
          source={{uri: `${APP_BASE_URL}${image}`}}
          equalSize={12}
          borderRadius={5}
        />

        <NotificationInfo
          trip_id={trip_id}
          created_at={created_at}
          message={message}
        />
      </AppView>
      {!isRead && (
        <AppView circleRadius={5} backgroundColor="primary" elevation={5} />
      )}
    </TouchableView>
  );
};

export default NotificationCard;
