import React, {useCallback, useContext, useState} from 'react';
import ActionItem from './ActionItem';
import I18n from 'react-native-i18n';
import store from '../../store/store';
import EventCardContext from '../../contexts/EventCardContext';
import {useSelector} from 'react-redux';
import {
  AppIcon,
  AppNavigation,
  AppText,
  showSuccess,
  TouchableView,
} from '../../common';
const JoinEvent = ({eventsRepo, onSuccess, ...rest}) => {
  const user = useSelector((state) => state.auth.userData?.user);
  const cardData = useContext(EventCardContext);
  const [isJoined, setIsJoined] = useState(
    user
      ? cardData.participants.findIndex((val) => val.id === user.id) >= 0
      : false,
  );
  const joinEvent = useCallback(async () => {
    if (isJoined) {
      if (onSuccess) {
        onSuccess();
      }
      return;
    }
    const res = await eventsRepo.joinEvent(cardData.event_id);
    if (res) {
      setIsJoined(true);
      cardData.setParticipants([...cardData.participants, user]);
      showSuccess(I18n.t('joined-sccuessfully'));
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [cardData, eventsRepo, onSuccess, isJoined, user]);

  return (
    <TouchableView
      row
      onPress={joinEvent}
      height={5}
      marginHorizontal={8}
      {...rest}>
      <AppIcon color={'grey'} name="location-outline" type="ion" size={10} />

      <AppText size={6} color="secondary" marginHorizontal={2}>
        {I18n.t('meet-in-event')}
      </AppText>
    </TouchableView>
  );
};

export default JoinEvent;
